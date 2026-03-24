export interface Leadership {
  name: string;
  role: string;
  image_url: string;
}

export interface Company {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  leadership: Leadership[];
  listings_ids: string[];
}

export interface MortgageProvider {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  terms: string;
  interest_rate?: number;
  max_loan_amount?: number;
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image_url: string;
  description: string;
  type: 'House' | 'Apartment' | 'Villa' | 'Penthouse';
  status: 'For Sale' | 'For Rent';
  featured?: boolean;
  company_name: string;
  company_id: string;
  mortgage_provider_ids?: string[];
}

export type ListingType = Listing['type'];
