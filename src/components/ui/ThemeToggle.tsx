import { Monitor, Moon, Sun } from 'lucide-react'
import { type ThemeMode, useTheme } from '../../contexts/ThemeContext'

const OPTIONS: { mode: ThemeMode; Icon: typeof Sun; label: string }[] = [
  { mode: 'light', Icon: Sun, label: 'Light' },
  { mode: 'system', Icon: Monitor, label: 'System' },
  { mode: 'dark', Icon: Moon, label: 'Dark' },
]

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useTheme()

  return (
    <div
      className="flex items-center rounded-full border border-[var(--soft-border)] bg-[var(--pure-white)] p-0.5 gap-0.5"
      role="group"
      aria-label="Colour scheme"
    >
      {OPTIONS.map(({ mode: m, Icon, label }) => (
        <button
          key={m}
          type="button"
          onClick={() => setMode(m)}
          aria-label={label}
          aria-pressed={mode === m}
          className={`flex items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange ${
            compact ? 'w-6 h-6' : 'w-7 h-7'
          } ${
            mode === m
              ? 'bg-primary-orange text-white'
              : 'text-[var(--muted-text)] hover:text-[var(--dark-navy)]'
          }`}
        >
          <Icon size={compact ? 11 : 13} aria-hidden />
        </button>
      ))}
    </div>
  )
}
