import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
  {
    name: "Free",
    price: 0,
    period: "month",
    features: [
      "3 thumbnail generations per month",
      "Standard thumbnail resolution",
      "Basic templates",
      "Watermarked exports",
      "Community support"
    ],
    mostPopular: false
  },
  {
    name: "Pro",
    price: 79,
    period: "month",
    features: [
      "Unlimited thumbnail generations",
      "High-resolution exports",
      "Premium thumbnail templates",
      "No watermark",
      "AI title & text suggestions",
      "Priority generation speed",
      "Email support"
    ],
    mostPopular: true
  },
  {
    name: "Enterprise",
    price: 199,
    period: "month",
    features: [
      "Everything in Pro",
      "Team access & collaboration",
      "Brand kits (fonts, colors, logos)",
      "Bulk thumbnail generation",
      "Advanced analytics (CTR insights)",
      "Dedicated account manager",
      "Priority support & SLA"
    ],
    mostPopular: false
  }
];
