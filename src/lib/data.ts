import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';
import type { LucideIcon } from 'lucide-react';
import { Copy, BookOpen, ShieldCheck, Users, Briefcase, Star } from 'lucide-react';

export interface Trader {
  id: string;
  name: string;
  returns: number;
  followers: number;
  avatar: ImagePlaceholder | undefined;
  chartData: { value: number }[];
}

export const traders: Trader[] = [
  { id: '1', name: 'Anjali Sharma', returns: 125.7, followers: 1500, avatar: PlaceHolderImages.find(img => img.id === 'trader-2'), chartData: [{value: 10}, {value: 50}, {value: 30}, {value: 80}, {value: 60}, {value: 125.7}]},
  { id: '2', name: 'Rohan Gupta', returns: 98.2, followers: 850, avatar: PlaceHolderImages.find(img => img.id === 'trader-1'), chartData: [{value: 20}, {value: 40}, {value: 25}, {value: 70}, {value: 50}, {value: 98.2}] },
  { id: '3', name: 'Priya Patel', returns: 75.4, followers: 620, avatar: PlaceHolderImages.find(img => img.id === 'trader-3'), chartData: [{value: 30}, {value: 35}, {value: 50}, {value: 45}, {value: 60}, {value: 75.4}] },
  { id: '4', name: 'Vikram Singh', returns: 62.1, followers: 430, avatar: PlaceHolderImages.find(img => img.id === 'trader-4'), chartData: [{value: 15}, {value: 25}, {value: 20}, {value: 40}, {value: 55}, {value: 62.1}] },
];

export interface Instrument {
    name: string;
    category: string;
    buyPrice: number;
    sellPrice: number;
    change: number;
    spread: number;
}
  
export const instruments: Instrument[] = [
    { name: 'EUR/USD', category: 'Forex', buyPrice: 1.0712, sellPrice: 1.0714, change: 0.25, spread: 2 },
    { name: 'USD/JPY', category: 'Forex', buyPrice: 157.34, sellPrice: 157.36, change: -0.11, spread: 2 },
    { name: 'TESLA', category: 'Stocks', buyPrice: 182.58, sellPrice: 182.68, change: 1.5, spread: 10 },
    { name: 'APPLE', category: 'Stocks', buyPrice: 214.29, sellPrice: 214.39, change: -0.8, spread: 10 },
    { name: 'GOLD', category: 'Commodities', buyPrice: 2325.50, sellPrice: 2326.00, change: 0.5, spread: 50 },
    { name: 'OIL', category: 'Commodities', buyPrice: 80.50, sellPrice: 80.55, change: -1.2, spread: 5 },
    { name: 'BITCOIN', category: 'Crypto', buyPrice: 66050, sellPrice: 66080, change: 2.1, spread: 30 },
    { name: 'ETHEREUM', category: 'Crypto', buyPrice: 3560, sellPrice: 3562, change: 1.8, spread: 2 },
];

export interface Award {
    title: string;
    issuer: string;
}

export const awards: Award[] = [
    { title: "Best Social Trading Platform", issuer: "Finance Magnates Awards 2023" },
    { title: "Most Innovative Broker", issuer: "UK Forex Awards 2022" },
    { title: "Best Mobile Trading App", issuer: "Global Forex Awards 2022" },
    { title: "Top CFD Broker", issuer: "World Finance Awards 2021" },
    { title: "Best Customer Service", issuer: "International Business Magazine 2021" },
    { title: "Best for Copy Trading", issuer: "Daytrading.com 2020" },
    { title: "Fastest Growing Broker", issuer: "Forex Expo Dubai 2020" },
    { title: "Best Educational Provider", issuer: "The European 2019" },
];

export interface Benefit {
    title: string;
    description: string;
    icon: LucideIcon;
}

export const benefits: Benefit[] = [
    { title: "Transparent Environment", description: "All our signal providers are ranked based on their realized P&L, ensuring full transparency.", icon: ShieldCheck },
    { title: "Investment Tools", description: "If you prefer self-trading, we still got you covered with all the tools a Pro-trader needs.", icon: Briefcase },
    { title: "Licensed & Regulated", description: "ZuluTrade is a fully licensed and regulated platform, ensuring a safe and secure trading environment.", icon: BookOpen },
    { title: "Customer Centric Culture", "description": "Whenever you need us, our customer support team is available 24/5 to assist you.", "icon": Users },
    { title: "Learning Environment", description: "Our tools, resources, and community make it easy to learn and grow as a trader.", icon: Star },
    { title: "Unique Advanced Features", description: "Features like ZuluGuard™ and Social Charts offer a unique trading experience.", icon: Copy },
]
