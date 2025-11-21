import type { Company } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getCompanies(): Promise<Company[]> {
  const response = await fetch(`${API_BASE_URL}/api/companies`);

  if (!response.ok) {
    throw new Error(`Failed to fetch companies: ${response.statusText}`);
  }

  return response.json();
}

export async function getCompany(ticker: string): Promise<Company> {
  const response = await fetch(`${API_BASE_URL}/api/companies/${ticker}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Company with ticker ${ticker} not found`);
    }
    throw new Error(`Failed to fetch company: ${response.statusText}`);
  }

  return response.json();
}

