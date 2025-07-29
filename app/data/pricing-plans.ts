import { AccessType } from '@prisma/client';

export interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  accessType: AccessType;
  features: string[];
  popular?: boolean;
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    title: 'Starter Plan',
    description: 'Perfect for beginners getting started with crypto flashing',
    price: 300,
    accessType: AccessType.SMALL,
    features: [
      'Up to $10,000 flash limit per transaction',
      'Basic blockchain networks (BTC, ETH)',
      'Email support',
      '48-hour transaction processing',
      'Basic mining server access',
      '30-day validity period',
      'Mobile app access',
      'Transaction history tracking'
    ]
  },
  {
    id: 'professional',
    title: 'Professional Plan',
    description: 'Most popular choice for serious crypto traders and professionals',
    price: 750,
    accessType: AccessType.MEDIUM,
    popular: true,
    badge: 'Most Popular',
    features: [
      'Up to $50,000 flash limit per transaction',
      'All blockchain networks (BTC, ETH, BCH, USDT, LTC)',
      'Priority email & chat support',
      '24-hour transaction processing',
      'Premium mining server access',
      '90-day validity period',
      'Advanced mobile app features',
      'Detailed transaction analytics',
      'API access for automation',
      'Custom wallet integration',
      'Bulk transaction support'
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise Plan',
    description: 'Advanced features for high-volume traders and institutions',
    price: 2500,
    accessType: AccessType.LARGE,
    features: [
      'Up to $200,000 flash limit per transaction',
      'All blockchain networks + DeFi protocols',
      '24/7 dedicated support & phone support',
      'Instant transaction processing',
      'Enterprise mining server cluster',
      '180-day validity period',
      'White-label mobile app',
      'Advanced analytics & reporting',
      'Full API suite with webhooks',
      'Multi-wallet management',
      'Unlimited bulk transactions',
      'Custom smart contract deployment',
      'Compliance & audit tools',
      'Dedicated account manager'
    ]
  },
  {
    id: 'institutional',
    title: 'Institutional Plan',
    description: 'Ultimate solution for large institutions and enterprise clients',
    price: 7000,
    accessType: AccessType.XLARGE,
    badge: 'Premium',
    features: [
      'Unlimited flash transaction limits',
      'All networks + custom blockchain support',
      'Dedicated 24/7 support team',
      'Real-time transaction processing',
      'Private mining server infrastructure',
      '365-day validity period',
      'Custom-branded platform',
      'Enterprise-grade analytics suite',
      'Complete API ecosystem',
      'Multi-signature wallet support',
      'Unlimited everything',
      'Custom development services',
      'Advanced compliance suite',
      'Legal & regulatory support',
      'On-premise deployment option',
      'Custom SLA agreements'
    ]
  }
];

export const getPlanByAccessType = (accessType: AccessType): PricingPlan | undefined => {
  return pricingPlans.find(plan => plan.accessType === accessType);
};

export const getPlanById = (id: string): PricingPlan | undefined => {
  return pricingPlans.find(plan => plan.id === id);
};

export const getPlanByPrice = (price: number): PricingPlan | undefined => {
  return pricingPlans.find(plan => plan.price === price);
};
