Cure Connect

Cure Connect is a modern, full-stack healthcare platform designed to simplify doctor-patient interactions with seamless online appointments, secure video consultations, and a CarePoints-based payment system. Built using Next.js, Prisma, and Tailwind CSS, it provides a scalable solution for telemedicine and digital healthcare services.

🚀 Features

Smart Appointment Booking
Real-time doctor availability with instant confirmation.

Secure Video Consultations
Integrated video calls using a pluggable provider (Vonage by default, adaptable to others).

CarePoints System
Flexible credit-based payment and rewards management.

Role-Based Access
Patients, Doctors, and Admins with dedicated dashboards.

Admin Console
Manage doctor verification, appointment oversight, and payout processing.

Scalable & Extensible
Modular architecture for clinics, telemedicine startups, or independent practices.

🛠 Tech Stack

Frontend: Next.js (App Router), Tailwind CSS, Shadcn UI

Backend: Node.js, Prisma, PostgreSQL/MongoDB (configurable)

Authentication: Clerk (role-based)

Video Calls: Vonage SDK (with adapter for other providers)

Payments & Credits: Custom CarePoints system

📦 Installation & Setup

Clone the repository:

git clone https://github.com/yourusername/cure-connect.git
cd cure-connect


Install dependencies:

npm install


Configure environment variables:
Create a .env.local file in the root directory and add:

DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_SECRET_KEY=your_clerk_secret_key
VONAGE_APP_ID=your_vonage_app_id
VONAGE_PRIVATE_KEY=your_vonage_private_key


Run database migrations:

npx prisma migrate dev


Start the development server:

npm run dev

📖 Usage

Patients:
Sign up, purchase CarePoints, and book video consultations.

Doctors:
Register, undergo verification, set availability, and receive payouts.

Admins:
Manage doctors, oversee appointments, and process payouts.

🌟 Roadmap

 AI-powered doctor recommendation

 Multiple payout methods (UPI/Bank Transfer)

 Dark/Light mode toggle

 Instant chat with doctors

🤝 Contributing

Contributions are welcome!

Fork the repo

Create your feature branch (git checkout -b feature/new-feature)

Commit your changes (git commit -m 'Add new feature')

Push to the branch (git push origin feature/new-feature)

Open a Pull Request

📄 License

This project is licensed under the MIT License – see the LICENSE
 file for details.