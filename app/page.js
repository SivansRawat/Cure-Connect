import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  Video,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Pricing from "@/components/pricing";
import AISymptomChecker from "@/components/ai-symptom-checker";
import HeroAtmosphericLight from "@/components/hero-atmospheric-light";
import HeroVerticalGrid from "@/components/hero-vertical-grid";
import HeroMacBookMockup from "@/components/hero-macbook-mockup";
import { creditBenefits, features, testimonials } from "@/lib/data";

export default function Home() {
  return (
    <div className="bg-[#050811] min-h-screen text-slate-100 selection:bg-teal-500/20 selection:text-teal-200">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#050811] pt-24 md:pt-32 pb-10 md:pb-14">
        {/* Layer 1: Atmospheric Colored Light Field (Rich, Luminous WebGL Canvas) */}
        <HeroAtmosphericLight />

        {/* Layer 2: Fixed Vertical Architectural Grid (Static Depth Panels) */}
        <HeroVerticalGrid />

        {/* Layer 3: Main Hero Content */}
        <div className="container mx-auto px-4 relative z-20 flex-1 flex flex-col justify-between">
          {/* 2-Column Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-8 md:pt-14 pb-8">
            {/* Left Column: Headline, Copy & CTAs */}
            <div className="lg:col-span-6 xl:col-span-6 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
                Connect with doctors. <br />
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 block mt-2">
                  anytime, anywhere.
                </span>
              </h1>

              <p className="text-slate-200/90 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl mt-6">
                Book appointments, consult via encrypted video, and manage your healthcare
                journey with top-tier board-certified physicians.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold px-8 py-6 text-base shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Link href="/onboarding">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/20 bg-white/[0.05] text-slate-100 hover:text-white hover:bg-white/[0.12] hover:border-white/30 px-8 py-6 text-base backdrop-blur-md transition-all cursor-pointer"
                >
                  <Link href="/doctors">Find Doctors</Link>
                </Button>
              </div>
            </div>

            {/* Right Column: MacBook Pro Mockup Playing Consultation Video */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
              <HeroMacBookMockup />
            </div>
          </div>

          {/* Bottom Feature Indicators */}
          <div className="pt-8 md:pt-12 border-t border-white/[0.08] mt-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
              {/* Feature 1 */}
              <div className="flex items-center gap-3.5 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:border-teal-400 group-hover:bg-teal-500/20 transition-all shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                    Verified Specialists
                  </h4>
                  <p className="text-xs text-slate-400 font-normal">
                    Vetted doctors across 15+ specialties
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3.5 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    AI Symptom Triage
                  </h4>
                  <p className="text-xs text-slate-400 font-normal">
                    Instant doctor matching via Gemini
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3.5 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:bg-blue-500/20 transition-all shrink-0">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    HD Video Consultations
                  </h4>
                  <p className="text-xs text-slate-400 font-normal">
                    Encrypted virtual care from home
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Symptom Checker Section */}
      <section className="py-16 md:py-24 bg-[#070c18] border-y border-white/[0.06] relative">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <AISymptomChecker />
        </div>
      </section>

      {/* Features Section ("How It Works") */}
      <section className="py-20 md:py-28 bg-[#050811] relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              Our platform makes healthcare accessible with just a few clicks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/[0.02] border-white/[0.06] hover:border-teal-500/30 hover:bg-white/[0.04] transition-all duration-300 rounded-2xl group"
              >
                <CardHeader className="pb-3">
                  <div className="bg-teal-500/[0.08] border border-teal-500/20 p-3 rounded-xl w-fit mb-4 group-hover:border-teal-500/40 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg md:text-xl font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 bg-[#070c18] border-t border-white/[0.06]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              Consultation Packages
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              Choose the perfect consultation package that fits your healthcare needs
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            {/* Clerk Pricing Table */}
            <Pricing />

            {/* Credit System Description */}
            <Card className="mt-12 bg-white/[0.02] border-white/[0.08] rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-semibold text-white flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2.5 text-teal-400" />
                  How Our Credit System Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3.5">
                  {creditBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 bg-teal-500/[0.1] border border-teal-500/20 p-1 rounded-full text-teal-400 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <p
                        className="text-slate-300 text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-[#050811] border-t border-white/[0.06]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              What Our Users Say
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              Hear from patients and doctors who use our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/[0.02] border-white/[0.06] hover:border-white/15 transition-all rounded-2xl"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-11 h-11 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mr-3.5">
                      <span className="text-teal-300 font-semibold text-sm">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm md:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300/90 text-sm leading-relaxed italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#050811] border-t border-white/[0.06]">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-teal-950/40 via-slate-900/60 to-blue-950/40 border-white/[0.08] rounded-3xl relative overflow-hidden shadow-2xl">
            <CardContent className="p-8 md:p-14 lg:p-16 relative z-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
                  Ready to take control of your healthcare?
                </h2>
                <p className="text-base md:text-lg text-slate-300/80 mb-8 leading-relaxed">
                  Join thousands of users who have simplified their healthcare
                  journey with our platform. Get started today and experience
                  healthcare the way it should be.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold px-7 py-6 text-base shadow-xl shadow-white/10 cursor-pointer"
                  >
                    <Link href="/sign-up">Sign Up Now</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white/15 bg-white/[0.03] text-slate-200 hover:text-white hover:bg-white/[0.08] hover:border-white/25 px-7 py-6 text-base backdrop-blur-md cursor-pointer"
                  >
                    <Link href="#pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>

              {/* Ambient atmospheric glow inside CTA card */}
              <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20" />
              <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -ml-10 -mb-10" />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
