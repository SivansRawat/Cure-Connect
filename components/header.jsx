import React from "react";
import { Button } from "./ui/button";
import {
  Calendar,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import { checkAndAllocateCredits } from "@/actions/credits";
import Image from "next/image";

export default async function Header() {
  let user = null;
  try {
    user = await checkUser();
    if (user?.role === "PATIENT") {
      await checkAndAllocateCredits(user);
    }
  } catch (error) {
    console.error("Header checkUser error caught gracefully:", error);
    user = null;
  }

  return (
    <header className="fixed top-0 w-full border-b border-white/[0.06] bg-[#050811]/60 backdrop-blur-xl z-50 transition-all duration-300">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center">
            <Image
              src="/logo-single.png"
              alt="CureConnect Logo"
              width={160}
              height={44}
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <SignedIn>
            {/* Admin Links */}
            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2 border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Admin Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0 text-slate-300 hover:bg-white/[0.08]"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </Button>
              </Link>
            )}

            {/* Doctor Links */}
            {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2 border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white"
                >
                  <Stethoscope className="h-4 w-4 text-cyan-400" />
                  Doctor Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0 text-slate-300 hover:bg-white/[0.08]"
                >
                  <Stethoscope className="h-4 w-4 text-cyan-400" />
                </Button>
              </Link>
            )}

            {/* Patient Links */}
            {user?.role === "PATIENT" && (
              <Link href="/appointments">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2 border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white"
                >
                  <Calendar className="h-4 w-4 text-teal-400" />
                  My Appointments
                </Button>
                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0 text-slate-300 hover:bg-white/[0.08]"
                >
                  <Calendar className="h-4 w-4 text-teal-400" />
                </Button>
              </Link>
            )}

            {/* Unassigned Role */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2 border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white"
                >
                  <User className="h-4 w-4 text-cyan-400" />
                  Complete Profile
                </Button>
                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0 text-slate-300 hover:bg-white/[0.08]"
                >
                  <User className="h-4 w-4 text-cyan-400" />
                </Button>
              </Link>
            )}
          </SignedIn>

          {(!user || user?.role !== "ADMIN") && (
            <Link href={user?.role === "DOCTOR" ? "/doctor" : "/pricing"}>
              <Badge
                variant="outline"
                className="h-9 bg-emerald-500/[0.08] border-emerald-500/30 px-3.5 py-1 flex items-center gap-2 hover:bg-emerald-500/[0.14] transition-colors cursor-pointer"
              >
                <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-medium text-xs md:text-sm">
                  {user && user.role !== "ADMIN" ? (
                    <>
                      {user.credits}{" "}
                      <span className="hidden sm:inline">
                        {user?.role === "PATIENT"
                          ? "Credits"
                          : "Earned Credits"}
                      </span>
                    </>
                  ) : (
                    <>Pricing</>
                  )}
                </span>
              </Badge>
            </Link>
          )}

          <SignedOut>
            <SignInButton>
              <Button
                variant="default"
                className="bg-white text-slate-900 hover:bg-slate-100 font-medium rounded-full px-5 shadow-sm shadow-white/10"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border border-white/20",
                  userButtonPopoverCard: "shadow-2xl border border-white/10 bg-[#0b1120]",
                  userPreviewMainIdentifier: "font-semibold text-white",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
