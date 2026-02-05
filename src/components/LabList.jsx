import { useParams, useNavigate, Link } from 'react-router-dom';
import { isLabCompleted } from '../utils/storage';

/**
 * LabList Component
 * List of labs for a specific topic with completion status
 */

function LabList({ topics, labs, completedLabs }) {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const topic = topics.find(t => t.id === topicId);
  const topicLabs = labs.filter(lab => lab.topicId === topicId);

  if (!topic) {
    return (
      <div className="error-page">
        <h2>Topic not found</h2>
        <Link to="/">← Back to Topics</Link>
      </div>
    );
  }

  return (
    <div className="labs-page">
      <header className="labs-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ←
        </button>
        <div className="labs-header-content">
          <h1>
            <span>{topic.icon}</span>
            {topic.name}
          </h1>
          <p>{topic.description}</p>
        </div>
      </header>

      <div className="labs-list">
        {topicLabs.map((lab, index) => (
          <LabCard
            key={lab.id}
            lab={lab}
            index={index + 1}
            completed={isLabCompleted(lab.id)}
            onClick={() => navigate(`/lab/${lab.id}`)}
          />
        ))}

        {topicLabs.length === 0 && (
          <p className="empty-message">No labs available for this topic yet.</p>
        )}
      </div>
    </div>
  );
}

function LabCard({ lab, index, completed, onClick }) {
  // Extract first line of description for preview
  const preview = lab.description.split('\n')[0].replace(/\*\*/g, '');

  return (
    <article
      className={`lab-card ${completed ? 'completed' : ''}`}
      onClick={onClick}
    >
      <div className={`lab-status ${completed ? 'complete' : 'incomplete'}`}>
        {completed ? '✓' : index}
      </div>

      <div className="lab-info">
        <h3>{lab.title}</h3>
        <p>{preview}</p>
      </div>

      <span className={`difficulty-badge ${lab.difficulty.toLowerCase()}`}>
        {lab.difficulty}
      </span>
    </article>
  );
}

export default LabList;
