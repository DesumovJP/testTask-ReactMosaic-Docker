import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  theme?: 'Blueprint' | 'Dark' | 'Light';
}

export function Dropdown({
  options,
  value,
  onChange,
  label,
  className = '',
  placeholder = 'Select framework',
  theme = 'Blueprint',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLightTheme = theme === 'Light';
  const isBlueprint = theme === 'Blueprint';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      const optionElement = dropdownRef.current?.querySelector(
        `[data-option-index="${highlightedIndex}"]`
      ) as HTMLElement;
      optionElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
        const currentIndex = options.findIndex((opt) => opt === value);
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          onChange(options[highlightedIndex]);
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const selectedOption = options.find((opt) => opt === value) || placeholder;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <label
          className={
            isLightTheme
              ? 'text-sm text-gray-600'
              : 'text-sm text-white'
          }
        >
          {label}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              const currentIndex = options.findIndex((opt) => opt === value);
              setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
            }
          }}
          onKeyDown={handleKeyDown}
          className={`px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors pr-6 w-full text-left flex items-center justify-between ${
            isLightTheme || isBlueprint
              ? 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
              : 'bg-white/10 backdrop-blur-md border-white/30 text-white hover:border-white/50'
          }`}
          aria-label={label || placeholder}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span>{selectedOption}</span>
          <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center pr-1.5 pointer-events-none">
            <svg
              className={`w-[5px] h-[5px] ${isLightTheme || isBlueprint ? 'text-gray-400' : 'text-white/70'}`}
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <path d="M4 0L0 4h8L4 0z" />
            </svg>
            <svg
              className={`w-[5px] h-[5px] -mt-0.5 ${isLightTheme || isBlueprint ? 'text-gray-400' : 'text-white/70'}`}
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <path d="M4 8L0 4h8L4 8z" />
            </svg>
          </div>
        </button>
        {isOpen && (
          <div
            className={`absolute z-50 mt-1 w-full rounded border shadow-lg max-h-60 overflow-auto ${
              isLightTheme || isBlueprint
                ? 'bg-white border-gray-300'
                : 'bg-neutral-800/90 backdrop-blur-md border-neutral-700'
            }`}
            role="listbox"
          >
            {options.map((option, index) => (
              <div
                key={option}
                data-option-index={index}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`px-2.5 py-1.5 text-xs cursor-pointer transition-colors ${
                  index === highlightedIndex
                    ? isLightTheme || isBlueprint
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-600 text-white'
                    : option === value
                      ? isLightTheme || isBlueprint
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-neutral-700 text-white'
                      : isLightTheme || isBlueprint
                        ? 'text-gray-900 hover:bg-gray-50'
                        : 'text-neutral-200 hover:bg-neutral-700'
                }`}
                role="option"
                aria-selected={option === value}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
