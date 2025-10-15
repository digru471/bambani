export const NAV_LINKS = [
  { name: 'Home', href: 'home' },
  { name: 'Couriers', href: '#couriers' },
  { name: 'About Us', href: 'about' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact Us', href: 'contact-us' },
];

export const COURIERS = [
  { name: 'FedEx', logo: 'https://picsum.photos/seed/fedex/120/60' },
  { name: 'DHL', logo: 'https://picsum.photos/seed/dhl/120/60' },
  { name: 'UPS', logo: 'https://picsum.photos/seed/ups/120/60' },
  { name: 'DTDC', logo: 'https://picsum.photos/seed/dtdc/120/60' },
  { name: 'Blue Dart', logo: 'https://picsum.photos/seed/bluedart/120/60' },
  { name: 'Delhivery', logo: 'https://picsum.photos/seed/delhivery/120/60' },
  { name: 'XpressBees', logo: 'https://picsum.photos/seed/xpressbees/120/60' },
  { name: 'Gati', logo: 'https://picsum.photos/seed/gati/120/60' },
  { name: 'First Flight', logo: 'https://picsum.photos/seed/firstflight/120/60' },
  { name: 'TNT', logo: 'https://picsum.photos/seed/tnt/120/60' },
  { name: 'Aramex', logo: 'https://picsum.photos/seed/aramex/120/60' },
  { name: 'Professional', logo: 'https://picsum.photos/seed/professional/120/60' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Enter Tracking Number',
    description: 'Simply enter your tracking number in the search box provided.',
  },
  {
    step: 2,
    title: 'Select Courier',
    description: 'Choose your courier service from our extensive list of partners.',
  },
  {
    step: 3,
    title: 'Track Your Shipment',
    description: 'Click the track button to see the latest status of your package.',
  },
];

export const FEATURES = [
  {
    title: 'Worldwide Coverage',
    description: 'We track parcels for over 500+ courier services around the globe.',
  },
  {
    title: 'Fast & Easy Tracking',
    description: 'Get real-time tracking information with just one click.',
  },
  {
    title: 'Completely Free',
    description: 'Our tracking service is completely free to use, with no hidden charges.',
  },
  {
    title: 'Email Notifications',
    description: 'Subscribe to get email updates on your shipment status automatically.',
  },
  {
    title: 'Multi-Language Support',
    description: 'Our service is available in multiple languages for your convenience.',
  },
  {
    title: 'Mobile Friendly',
    description: 'Track your shipments on the go with our mobile-responsive website.',
  },
];

export const PRICING_PLANS = [
  {
    name: 'Basic',
    price: 'Free',
    priceDetail: 'for personal use',
    description: 'For individuals who need to track occasional packages.',
    features: [
      'Up to 5 trackers/month',
      'Real-time status updates',
      'Email notifications',
      'Community support',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$9.99',
    priceDetail: '/ month',
    description: 'For small businesses and frequent shippers.',
    features: [
      'Up to 100 trackers/month',
      'All Basic features',
      'SMS notifications',
      'Tracking history',
      'Priority support',
    ],
    popular: true,
    cta: 'Choose Plan',
  },
  {
    name: 'Business',
    price: 'Contact Us',
    priceDetail: 'for a quote',
    description: 'For large enterprises with high-volume shipping needs.',
    features: [
      'Unlimited trackers',
      'All Pro features',
      'API access',
      'Dedicated account manager',
      'Custom branding',
    ],
    popular: false,
    cta: 'Contact Sales',
  },
];