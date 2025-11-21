import { ReactNode } from 'react';
import { Dropdown } from '../ui/Dropdown';
import {
  ArrowsRightLeftIcon,
  PlusIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface WidgetShellProps {
  title: string;
  children: ReactNode;
  tickers?: string[];
  selectedTicker?: string;
  onTickerChange?: (ticker: string) => void;
  theme?: 'Blueprint' | 'Dark' | 'Light';
}

export function WidgetShell({
  title,
  children,
  tickers,
  selectedTicker,
  onTickerChange,
  theme = 'Blueprint',
}: WidgetShellProps) {
  const isLightTheme = theme === 'Light';
  const isBlueprint = theme === 'Blueprint';

  return (
    <div
      className={`h-full w-full flex flex-col ${
        !isLightTheme && !isBlueprint ? 'bg-neutral-900' : ''
      }`}
      style={
        isLightTheme || isBlueprint ? { backgroundColor: '#f6f7f9' } : undefined
      }
    >
      <div
        className={`px-4 py-2.5 border-b flex items-center gap-3 ${
          isLightTheme || isBlueprint
            ? 'bg-white border-gray-300'
            : 'border-neutral-700'
        }`}
        style={
          !isLightTheme && !isBlueprint
            ? {
                backgroundColor: 'oklch(0.36 0.02 258.42)',
              }
            : undefined
        }
      >
        <h2
          className={`text-sm font-semibold flex-shrink-0 ${
            isLightTheme || isBlueprint ? 'text-gray-900' : 'text-white'
          }`}
        >
          {title}
        </h2>
        {tickers && selectedTicker && onTickerChange && (
          <div className="flex-shrink-0">
            <Dropdown
              options={tickers}
              value={selectedTicker}
              onChange={onTickerChange}
              className="text-xs"
              placeholder="Select framework"
              theme={theme}
            />
          </div>
        )}
        <div className="flex-1" />
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            className={`p-1.5 rounded transition-colors ${
              isLightTheme || isBlueprint
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                : 'text-white hover:text-white hover:bg-white/10'
            }`}
            aria-label="Swap"
            title="Swap"
          >
            <ArrowsRightLeftIcon className="w-4 h-4" />
          </button>
          <button
            className={`p-1.5 rounded transition-colors ${
              isLightTheme || isBlueprint
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                : 'text-white hover:text-white hover:bg-white/10'
            }`}
            aria-label="Add panel"
            title="Add panel"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
          <button
            className={`p-1.5 rounded transition-colors ${
              isLightTheme || isBlueprint
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                : 'text-white hover:text-white hover:bg-white/10'
            }`}
            aria-label="Maximize"
            title="Maximize"
          >
            <ArrowsPointingOutIcon className="w-4 h-4" />
          </button>
          <button
            className={`p-1.5 rounded transition-colors ${
              isLightTheme || isBlueprint
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                : 'text-white hover:text-white hover:bg-white/10'
            }`}
            aria-label="Close"
            title="Close"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        className={`flex-1 overflow-auto p-4 ${
          isLightTheme
            ? 'text-gray-900'
            : isBlueprint
              ? 'text-neutral-900'
              : 'bg-neutral-900 text-neutral-200'
        }`}
        style={
          isLightTheme || isBlueprint
            ? { backgroundColor: '#f6f7f9' }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
