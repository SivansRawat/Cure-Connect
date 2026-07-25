"use client";

import React, { Component } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PricingTable } from "@clerk/nextjs";
import { Check, AlertTriangle, ShieldCheck } from "lucide-react";

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
            className={`relative flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? "bg-gradient-to-b from-emerald-950/60 to-emerald-900/20 border-emerald-500/50 shadow-emerald-950/50 shadow-lg"
                : "bg-card border-emerald-900/20 hover:border-emerald-800/40"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-emerald-500 text-black font-semibold px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="pt-6">
              <CardTitle className="text-xl font-bold text-white">{plan.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="ml-2 text-sm text-emerald-400 font-medium">/ {plan.credits}</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <Check className="h-4 w-4 text-emerald-400 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 border border-emerald-700/40"
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
  const isBillingEnabled = process.env.NEXT_PUBLIC_CLERK_BILLING_ENABLED === "true";

  return (
    <Card className="border-emerald-900/30 shadow-lg bg-gradient-to-b from-emerald-950/30 to-transparent">
      <CardContent className="p-6 md:p-8">
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

