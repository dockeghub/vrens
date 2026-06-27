"use client";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Loader2, Star } from "lucide-react";
import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  planId: string;
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

function CheckoutButton({
  plan,
  isMonthly,
  className,
}: {
  plan: PricingPlan;
  isMonthly: boolean;
  className: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.planId,
          billing: isMonthly ? "standard" : "bundle",
        }),
      });
      const data = await res.json() as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleOrder} disabled={loading} className={className}>
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Redirecting…
        </span>
      ) : plan.buttonText}
    </button>
  );
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "No hidden fees. Just thumbnails that perform.\nPay per thumbnail or save with a bundle.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#ef4444", "#f97316", "#eab308", "#22c55e"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <section id="pricing" className="py-24">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-4 text-center mb-12">
        <Badge variant="outline">Pricing</Badge>
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="flex justify-center items-center gap-3 mb-10">
        <span className={cn("font-semibold", isMonthly ? "text-foreground" : "text-muted-foreground")}>
          Per Thumbnail
        </span>
        <Label>
          <Switch
            ref={switchRef as React.Ref<HTMLButtonElement>}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
            className="relative"
          />
        </Label>
        <span className={cn("font-semibold", !isMonthly ? "text-foreground" : "text-muted-foreground")}>
          Bundle Pricing <span className="text-primary">(Save 20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              "rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative",
              plan.isPopular ? "border-primary border-2" : "border-border",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 && "origin-right",
              index === 2 && "origin-left",
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-primary-foreground h-4 w-4 fill-current" />
                <span className="text-primary-foreground ml-1 font-sans font-semibold">
                  Popular
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  <NumberFlow
                    value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{ duration: 500, easing: "ease-out" }}
                    willChange
                    className="tabular-nums"
                  />
                </span>
                {plan.period !== "flat rate" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly ? "standard pricing" : "bundle discount applied"}
              </p>

              <ul className="mt-5 gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4 border-border" />

              <CheckoutButton
                plan={plan}
                isMonthly={isMonthly}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full text-lg font-semibold tracking-tighter cursor-pointer",
                  "transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed",
                  plan.isPopular
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground",
                )}
              />
              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </section>
  );
}
