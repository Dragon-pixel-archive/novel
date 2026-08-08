import { NavLink, Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <section className="admin-layout">
      <nav className="admin-nav">
        <NavLink to="/admin/novels" className={({ isActive }) => isActive ? 'active' : ''}>
          Truyện
        </NavLink>
        <NavLink to="/admin/chapters" className={({ isActive }) => isActive ? 'active' : ''}>
          Chương
        </NavLink>
        <NavLink to="/admin/tags" className={({ isActive }) => isActive ? 'active' : ''}>
          Tag
        </NavLink>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </section>
  )
}

export default AdminLayout