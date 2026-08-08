import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-logo">
        <span className="dot" />
        Trang chủ
      </Link>
    </header>
  )
}

export default Header