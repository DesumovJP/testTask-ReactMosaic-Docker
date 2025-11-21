import type { Company } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getCompanies(): Promise<Company[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/companies`);

    if (!response.ok) {
      throw new Error(`Failed to fetch companies: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please make sure the server is running.');
    }
    throw error;
  }
}

export async function getCompany(ticker: string): Promise<Company> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/companies/${ticker}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Company with ticker ${ticker} not found`);
      }
      throw new Error(`Failed to fetch company: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please make sure the server is running.');
    }
    throw error;
  }
}

