import { useState } from 'react'

const THEMES = ['light', 'dark', 'anime']

const ICONS = {
  light: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" fill="currentColor" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12" y1="2.5" x2="12" y2="4.8" />
        <line x1="12" y1="19.2" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="4.8" y2="12" />
        <line x1="19.2" y1="12" x2="21.5" y2="12" />
        <line x1="5.1" y1="5.1" x2="6.7" y2="6.7" />
        <line x1="17.3" y1="17.3" x2="18.9" y2="18.9" />
        <line x1="5.1" y1="18.9" x2="6.7" y2="17.3" />
        <line x1="17.3" y1="6.7" x2="18.9" y2="5.1" />
      </g>
    </svg>
  ),
  anime: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5 14 9.2 20.5 10 15.5 14.3 17 21 12 17.2 7 21 8.5 14.3 3.5 10 10 9.2Z"
        fill="currentColor"
      />
    </svg>
  ),
}

const LABELS = {
  light: 'Sáng',
  dark: 'Tối',
  anime: 'Anime',
}

function ThemeToggle({ theme, onChange }) {
  // theme & onChange sẽ được điều khiển từ ngoài khi bạn viết logic thật
  const currentIndex = THEMES.indexOf(theme)

  const handleClick = () => {
    const next = THEMES[(currentIndex + 1) % THEMES.length]
    onChange?.(next)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      data-theme-active={theme}
      onClick={handleClick}
      aria-label={`Đang dùng giao diện ${LABELS[theme]}, bấm để đổi`}
    >
      <span className="theme-toggle-icon" key={theme}>
        {ICONS[theme]}
      </span>

      <span className="theme-toggle-dots">
        {THEMES.map((t) => (
          <span
            key={t}
            className={`dot${t === theme ? ' dot-active' : ''}`}
          />
        ))}
      </span>
    </button>
  )
}

export default ThemeToggle