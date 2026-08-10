import { Link } from 'react-router-dom'
import { useTheme } from "./ThemeContext";
import ThemeToggle from './ThemeToggle'

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="site-header">
      <Link to="/" className="site-logo">
        <svg
          className="logo-mark"
          viewBox="0 0 24 24"
          fill="none"
          url="https://w84ewcnhybjt40cj.public.blob.vercel-storage.com/avanovel.png"
        >
          <path
            d="M4 4.5C4 3.67 4.67 3 5.5 3H12V21H5.5C4.67 21 4 20.33 4 19.5V4.5Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M20 4.5C20 3.67 19.33 3 18.5 3H12V21H18.5C19.33 21 20 20.33 20 19.5V4.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        <span className="logo-text">Novel Archive</span>
      </Link>

      <ThemeToggle theme={theme} onChange={setTheme} />
    </header>
  );
}

export default Header