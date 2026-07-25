import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        transactions: {
          where: {
            type: "CREDIT_PURCHASE",
            // Only get transactions from current month
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    const rawName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
    const name = rawName.length > 0 ? rawName : user.username || user.emailAddresses[0]?.emailAddress?.split("@")[0] || "User";

    if (loggedInUser) {
      // Clean up legacy "null null" names if present
      if (loggedInUser.name === "null null" || loggedInUser.name === "null" || !loggedInUser.name) {
        const updated = await db.user.update({
          where: { id: loggedInUser.id },
          data: { name },
        });
        return updated;
      }
      return loggedInUser;
    }

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        transactions: {
          create: {
            type: "CREDIT_PURCHASE",
            packageId: "free_user",
            amount: 0,
          },
        },
      },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};
