/**
 * Navbar Component
 * Top navigation bar with branding, progress, and theme toggle
 */

function Navbar({ theme, onToggleTheme, onToggleSidebar, progress }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          ☰
        </button>
        <div className="navbar-brand-icon">JS</div>
        <span>JS Topic Labs</span>
      </div>

      <div className="navbar-actions">
        <div className="navbar-progress">
          <span>{progress.completed}/{progress.total} labs</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span>{progress.percentage}%</span>
        </div>

        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
