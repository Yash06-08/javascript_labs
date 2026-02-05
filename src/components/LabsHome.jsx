import { Link } from 'react-router-dom';

function LabsHome() {
  return (
    <div className="labs-home">
      <header className="labs-home-header">
        <div className="labs-home-brand">
          <div className="labs-home-brand-icon">LB</div>
          <span className="labs-home-brand-text">Laboratories</span>
        </div>
        <h1 className="labs-home-title">Choose your lab</h1>
        <p className="labs-home-subtitle">
          Pick a language track to start practicing with interactive lessons.
        </p>
      </header>

      <section className="labs-home-grid">
        <Link to="/js" className="lab-category-card" style={{ textDecoration: 'none' }}>
          <div className="lab-category-left">
            <div className="lab-category-icon js">JS</div>
            <div className="lab-category-text">
              <div className="lab-category-title">JavaScript</div>
              <div className="lab-category-meta">Interactive lessons and exercises</div>
            </div>
          </div>
          <div className="lab-category-right">→</div>
        </Link>

        <Link to="/python" className="lab-category-card" style={{ textDecoration: 'none' }}>
          <div className="lab-category-left">
            <div className="lab-category-icon py">PY</div>
            <div className="lab-category-text">
              <div className="lab-category-title">Python</div>
              <div className="lab-category-meta">Coming soon</div>
            </div>
          </div>
          <div className="lab-category-right">→</div>
        </Link>

        <Link to="/sql" className="lab-category-card" style={{ textDecoration: 'none' }}>
          <div className="lab-category-left">
            <div className="lab-category-icon sql">SQL</div>
            <div className="lab-category-text">
              <div className="lab-category-title">SQL</div>
              <div className="lab-category-meta">Coming soon</div>
            </div>
          </div>
          <div className="lab-category-right">→</div>
        </Link>
      </section>
    </div>
  );
}

export default LabsHome;
