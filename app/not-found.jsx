import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050811] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-200 mb-4">
        Page Not Found
      </h2>
      <p className="text-slate-400 max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild className="rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold px-6 py-5">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
