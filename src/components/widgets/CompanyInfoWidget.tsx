import { useEffect, useState } from 'react';
import { getCompany } from '../../lib/api';
import type { Company } from '../../lib/types';
import { WidgetShell } from './WidgetShell';
import { Spinner } from '../ui/Spinner';
import { Card } from '../ui/Card';

interface CompanyInfoWidgetProps {
  ticker: string;
  tickers?: string[];
  onTickerChange?: (ticker: string) => void;
  theme?: 'Blueprint' | 'Dark' | 'Light';
}

export function CompanyInfoWidget({
  ticker,
  tickers,
  onTickerChange,
  theme = 'Blueprint',
}: CompanyInfoWidgetProps) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setCompany(null);

    let cancelled = false;

    getCompany(ticker)
      .then((data) => {
        if (!cancelled) {
          setCompany(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load company data');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [ticker]);

  const isLightTheme = theme === 'Light';
  const isBlueprint = theme === 'Blueprint';

  if (loading) {
    return (
      <WidgetShell
        title="Company info"
        tickers={tickers}
        selectedTicker={ticker}
        onTickerChange={onTickerChange}
        theme={theme}
      >
        <Spinner />
      </WidgetShell>
    );
  }

  if (error) {
    return (
      <WidgetShell
        title="Company info"
        tickers={tickers}
        selectedTicker={ticker}
        onTickerChange={onTickerChange}
        theme={theme}
      >
        <Card className="p-4">
          <div className="text-red-400 mb-4">{error}</div>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              getCompany(ticker)
                .then((data) => {
                  setCompany(data);
                  setLoading(false);
                })
                .catch((err) => {
                  setError(err instanceof Error ? err.message : 'Failed to load company data');
                  setLoading(false);
                });
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Retry
          </button>
        </Card>
      </WidgetShell>
    );
  }

  if (!company) {
    return (
      <WidgetShell
        title="Company info"
        tickers={tickers}
        selectedTicker={ticker}
        onTickerChange={onTickerChange}
        theme={theme}
      >
        <div
          className={`text-center p-8 ${
            isLightTheme || isBlueprint ? 'text-gray-500' : 'text-neutral-400'
          }`}
        >
          No company selected
        </div>
      </WidgetShell>
    );
  }

  return (
    <WidgetShell
      title="Company info"
      tickers={tickers}
      selectedTicker={ticker}
      onTickerChange={onTickerChange}
      theme={theme}
    >
      <div
        className={`space-y-2 text-sm ${
          isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
        }`}
      >
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            ticker:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.ticker}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Name:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.name}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Legal name:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.legal_name}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Stock exchange:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.stock_exchange}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Short description:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.short_description}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Long description:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.long_description}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Web:
          </span>{' '}
          <a
            href={`https://${company.company_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {company.company_url}
          </a>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Business address:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.business_address}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Business phone:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.business_phone_no}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Entity legal form:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.entity_legal_form || 'N/A'}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Latest filing date:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.latest_filing_date || 'N/A'}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Inc country:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.inc_country}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Employees:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.employees.toLocaleString()}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Sector:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.sector}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Industry category:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.industry_category}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Industry group:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.industry_group}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            first_stock_price_date:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.first_stock_price_date || 'N/A'}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            last_stock_price_date:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.last_stock_price_date || 'N/A'}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Thea enabled:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.thea_enabled !== null ? String(company.thea_enabled) : 'N/A'}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Legacy sector:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.legacy_sector || 'N/A'}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Legacy industry category:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.legacy_industry_category || 'N/A'}
          </span>
        </div>
        <div>
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-600' : 'text-neutral-400'
            }
          >
            Legacy industry group:
          </span>{' '}
          <span
            className={
              isLightTheme || isBlueprint ? 'text-gray-900' : 'text-neutral-200'
            }
          >
            {company.legacy_industry_group || 'N/A'}
          </span>
        </div>
      </div>
    </WidgetShell>
  );
}
