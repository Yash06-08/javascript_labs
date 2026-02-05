import { Link } from 'react-router-dom';

function LanguagePlaceholder({ language }) {
  return (
    <div className="language-placeholder">
      <header className="language-placeholder-header">
        <h1 className="language-placeholder-title">{language} Labs</h1>
        <p className="language-placeholder-subtitle">This track is coming soon.</p>
      </header>

      <div className="language-placeholder-card">
        <p style={{ marginBottom: '12px' }}>
          When the {language} labs are ready, we can link them directly from the intro page.
        </p>
        <Link to="/" className="btn btn-primary">← Back to Labs</Link>
      </div>
    </div>
  );
}

export default LanguagePlaceholder;
