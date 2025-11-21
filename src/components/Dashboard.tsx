import { useState, useEffect } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import '../styles/mosaic.css';
import { CompanyInfoWidget } from './widgets/CompanyInfoWidget';
import { getCompanies } from '../lib/api';
import type { Company } from '../lib/types';
import { Dropdown } from './ui/Dropdown';

type ViewId = '1' | '2' | '3';
type Theme = 'Blueprint' | 'Dark' | 'Light';

export function Dashboard() {
  const [tickers, setTickers] = useState<string[]>([]);
  const [selectedTickers, setSelectedTickers] = useState<{ [key: string]: string }>({
    '1': 'AAPL',
    '2': 'AAPL',
    '3': 'NVDA',
  });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>('Blueprint');

  useEffect(() => {
    getCompanies()
      .then((companies: Company[]) => {
        const tickerList = companies.map((c) => c.ticker).sort();
        setTickers(tickerList);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleTickerChange = (viewId: ViewId, ticker: string) => {
    setSelectedTickers((prev) => ({
      ...prev,
      [viewId]: ticker,
    }));
  };

  const renderTile = (id: ViewId) => (
    <MosaicWindow<ViewId>
      path={id}
      title=""
      toolbarControls={[]}
      createNode={() => 'new'}
    >
      <CompanyInfoWidget
        ticker={selectedTickers[id]}
        tickers={tickers}
        onTickerChange={(ticker) => handleTickerChange(id, ticker)}
        theme={theme}
      />
    </MosaicWindow>
  );

  const initialValue = {
    direction: 'row' as const,
    first: '1' as ViewId,
    second: {
      direction: 'column' as const,
      first: '2' as ViewId,
      second: '3' as ViewId,
    },
  };

  const isLightTheme = theme === 'Light';
  const isDarkTheme = theme === 'Dark';
  const isBlueprint = theme === 'Blueprint';

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden ${
        isLightTheme ? 'bg-gray-100' : 'bg-neutral-950'
      }`}
    >
      <div
        className={`px-2 lg:px-4 py-2 border-b flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-4 text-sm ${
          isLightTheme
            ? 'bg-white border-gray-300'
            : isDarkTheme
              ? 'bg-neutral-800 border-neutral-700'
              : isBlueprint
                ? 'border-neutral-700'
                : 'bg-neutral-800 border-neutral-700'
        }`}
        style={
          isBlueprint
            ? {
                backgroundColor: 'oklch(0.36 0.02 258.42)',
              }
            : undefined
        }
      >
        {/* Mobile/Tablet Layout */}
        <div className="flex flex-col gap-2 w-full lg:hidden">
          {/* First row: react-mosaic + GitHub icon */}
          <div className="flex items-center justify-between w-full gap-2">
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'} whitespace-nowrap`}>
              <span className="font-medium">react-mosaic</span>{' '}
              <span className={isLightTheme ? 'text-gray-500' : 'text-neutral-400'}>
                v6.1.0
              </span>
            </span>
            <a
              href="https://github.com/nomcopter/react-mosaic"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-80 transition-opacity flex-shrink-0 ${
                isLightTheme ? 'text-gray-600' : 'text-white'
              }`}
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
          {/* Second row: Theme left, buttons right */}
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Dropdown
                options={['Blueprint', 'Dark', 'Light']}
                value={theme}
                onChange={(value) => setTheme(value as Theme)}
                label="Theme:"
                theme={theme}
                className="text-xs"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                className={`px-2 py-1 rounded text-xs flex items-center gap-1 border transition-colors whitespace-nowrap ${
                  isLightTheme
                    ? 'text-gray-700 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
                    : 'text-white border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="5" height="5" />
                  <rect x="9" y="2" width="5" height="5" />
                  <rect x="2" y="9" width="5" height="5" />
                  <rect x="9" y="9" width="5" height="5" />
                </svg>
                <span className="hidden sm:inline">Arrange</span>
              </button>
              <button
                className={`px-2 py-1 rounded text-xs flex items-center gap-1 border transition-colors whitespace-nowrap ${
                  isLightTheme
                    ? 'text-gray-700 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
                    : 'text-white border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7m0 0H9m8 0v8"
                  />
                </svg>
                <span>Add Window</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center gap-4 w-full">
          <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'} whitespace-nowrap`}>
            <span className="font-medium">react-mosaic</span>{' '}
            <span className={isLightTheme ? 'text-gray-500' : 'text-neutral-400'}>
              v6.1.0
            </span>
          </span>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Dropdown
                options={['Blueprint', 'Dark', 'Light']}
                value={theme}
                onChange={(value) => setTheme(value as Theme)}
                label="Theme:"
                theme={theme}
                className="text-xs"
              />
            </div>
            <div
              className={`h-4 w-px ${
                isLightTheme ? 'bg-gray-300' : 'bg-white/30'
              }`}
            />
            <span className={`${isLightTheme ? 'text-gray-600' : 'text-white'} whitespace-nowrap text-sm`}>
              Example Actions:
            </span>
            <div className="flex items-center gap-2">
              <button
                className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 border transition-colors whitespace-nowrap ${
                  isLightTheme
                    ? 'text-gray-700 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
                    : 'text-white border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="5" height="5" />
                  <rect x="9" y="2" width="5" height="5" />
                  <rect x="2" y="9" width="5" height="5" />
                  <rect x="9" y="9" width="5" height="5" />
                </svg>
                <span>Auto Arrange</span>
              </button>
              <button
                className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 border transition-colors whitespace-nowrap ${
                  isLightTheme
                    ? 'text-gray-700 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
                    : 'text-white border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7m0 0H9m8 0v8"
                  />
                </svg>
                <span className="hidden xl:inline">Add Window to Top Right</span>
                <span className="xl:hidden">Add Window</span>
              </button>
            </div>
            <a
              href="https://github.com/nomcopter/react-mosaic"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-80 transition-opacity flex-shrink-0 ml-3 ${
                isLightTheme ? 'text-gray-600' : 'text-white'
              }`}
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Mosaic<ViewId>
          renderTile={renderTile}
          initialValue={initialValue}
          className={`mosaic-${theme.toLowerCase()}-theme`}
        />
      </div>
    </div>
  );
}
