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
  const isLightTheme = theme === 'Light';
  const isBlueprint = theme === 'Blueprint';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <label
          htmlFor="ticker-select"
          className={
            isLightTheme || isBlueprint
              ? 'text-sm text-gray-600'
              : 'text-sm text-neutral-300'
          }
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id="ticker-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none pr-6 ${
            isLightTheme || isBlueprint
              ? 'bg-white border-gray-300 text-gray-900'
              : 'bg-white/10 border-white/30 text-white'
          }`}
          aria-label={label || placeholder}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
      </div>
    </div>
  );
}
