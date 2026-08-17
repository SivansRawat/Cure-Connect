"use client";

import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PricingTable } from "@clerk/nextjs";
import { Check } from "lucide-react";

class PricingErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Clerk PricingTable error caught gracefully:", error?.message);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackPricingUI />;
    }

    return this.props.children;
  }
}

function FallbackPricingUI() {
  const fallbackPlans = [
    {
      name: "Basic Care",
      price: "$19",
      credits: "2 Credits",
      description: "Ideal for a single consultation",
      features: [
        "1 Doctor Video Consultation",
        "2 CarePoints Credits",
        "Credits never expire",
        "Standard support",
      ],
      popular: false,
    },
    {
      name: "Value Pack",
      price: "$49",
      credits: "6 Credits",
      description: "Best value for individual healthcare",
      features: [
        "3 Doctor Video Consultations",
        "6 CarePoints Credits",
        "Credits never expire",
        "Priority scheduling",
        "Full medical history access",
      ],
      popular: true,
    },
    {
      name: "Family Pack",
      price: "$89",
      credits: "12 Credits",
      description: "Complete coverage for the whole family",
      features: [
        "6 Doctor Video Consultations",
        "12 CarePoints Credits",
        "Credits never expire",
        "24/7 Priority support",
        "Shareable family credits",
      ],
      popular: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fallbackPlans.map((plan, index) => (
          <Card
            key={index}
            className={`relative flex flex-col justify-between transition-all duration-300 rounded-2xl ${
              plan.popular
                ? "bg-gradient-to-b from-teal-950/40 via-slate-900/60 to-slate-950/80 border-teal-500/40 shadow-xl shadow-teal-950/30"
                : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-teal-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="pt-6">
              <CardTitle className="text-xl font-semibold text-white">
                {plan.name}
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                {plan.description}
              </CardDescription>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-3xl md:text-4xl font-bold tracking-tight">
                  {plan.price}
                </span>
                <span className="ml-2 text-xs md:text-sm text-teal-300 font-medium">
                  / {plan.credits}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3 text-xs md:text-sm text-slate-300">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <Check className="h-4 w-4 text-teal-400 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className={`w-full font-semibold rounded-xl py-5 transition-all cursor-pointer ${
                  plan.popular
                    ? "bg-white text-slate-950 hover:bg-slate-100 shadow-md shadow-white/5"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10"
                }`}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

const Pricing = () => {
  const isBillingEnabled =
    process.env.NEXT_PUBLIC_CLERK_BILLING_ENABLED === "true";

  return (
    <Card className="border-white/[0.08] shadow-2xl bg-transparent rounded-2xl overflow-hidden">
      <CardContent className="p-2 md:p-4">
        {isBillingEnabled ? (
          <PricingErrorBoundary>
            <PricingTable
              checkoutProps={{
                appearance: {
                  elements: {
                    drawerRoot: {
                      zIndex: 2000,
                    },
                  },
                },
              }}
            />
          </PricingErrorBoundary>
        ) : (
          <FallbackPricingUI />
        )}
      </CardContent>
    </Card>
  );
};

export default Pricing;
