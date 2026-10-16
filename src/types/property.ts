export type PropertyType = 'rumah' | 'villa' | 'kos';

export interface PropertyArchetype {
  id: PropertyType;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  specs: {
    minLandArea: number; // m2
    avgBuildDurationMonths: number;
    estimatedCostPerM2: number; // in IDR
    typicalYieldPercent: string;
    targetSegment: string;
  };
  features: string[];
  sampleProjections: {
    landSize: number;
    estimatedRAB: string;
    monthlyRevenue?: string;
    annualROI?: string;
  };
}

export interface TargetClient {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  avatarIcon: string;
  description: string;
  painPoint: string;
  recommendation: string;
}

export interface JogjaZone {
  id: string;
  name: string;
  region: 'Sleman' | 'Kota Yogyakarta' | 'Bantul';
  category: 'Kawasan Kampus' | 'Kawasan Wisata' | 'Kawasan Premium';
  subDistricts: string[];
  recommendedProperty: PropertyType;
  landPriceRange: string; // e.g. "Rp 4 - 8 Jt/m²"
  occupancyRate: string; // e.g. "88 - 95%"
  yieldEstimate: string; // e.g. "12 - 16% / thn"
  description: string;
  landmarks: string[];
}

export interface HotLeadSource {
  id: string;
  title: string;
  description: string;
  icon: string;
  flow: string;
}

export interface MarketingStrategyTier {
  id: string;
  tier: 'HIGH INTENT' | 'PROBLEM / PLANNING' | 'RETARGETING';
  sublabel: string;
  color: string;
  keywords: string[];
  audienceTrigger: string;
}

export interface FunnelStep {
  step: number;
  title: string;
  actionText: string;
  icon: string;
  detail: string;
}

export interface ContentCategory {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  description: string;
  sampleItem: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: PropertyType;
  location: string;
  landArea: number;
  buildingArea: number;
  initialCondition: string;
  developedInto: string;
  constructionTime: string;
  rabTotal: string;
  actualReturn: string;
  image: string;
}

export interface LeadFormData {
  fullName: string;
  locationZone: string;
  landArea: number;
  propertyType: PropertyType;
  budgetRange: string;
  startTimeline: string;
  whatsappNumber: string;
  extraNotes?: string;
}

export interface CalculationResult {
  landArea: number;
  propertyType: PropertyType;
  buildingCoverageArea: number; // KDB 60%
  greenOpenSpace: number; // 40%
  suggestedFloors: number;
  totalBuildingArea: number;
  estimatedRAB: number; // in IDR
  roomCountEstimate?: number;
  monthlyRevenueEstimate?: number;
  annualGrossYield?: number;
  estimatedROI?: number;
  threeConcepts: {
    title: string;
    type: PropertyType;
    floors: number;
    gfa: number;
    estimatedCost: number;
    keyBenefit: string;
    cashflowSummary: string;
  }[];
  formattedWhatsAppText: string;
  whatsappUrl: string;
}
