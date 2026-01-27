import { useNavigate } from 'react-router-dom';
import { getTopicProgress } from '../utils/storage';

/**
 * TopicList Component
 * Grid of topic cards showing progress and lab counts
 */

function TopicList({ topics, labs, completedLabs }) {
  const navigate = useNavigate();

  return (
    <div className="topics-page">
      <header className="topics-header">
        <h1>JavaScript Practice Labs</h1>
        <p>Master JavaScript concepts through hands-on coding exercises</p>
      </header>

      <div className="topics-grid">
        {topics.map(topic => {
          const topicLabs = labs.filter(lab => lab.topicId === topic.id);
          const progress = getTopicProgress(topic.id, labs);

          return (
            <TopicCard
              key={topic.id}
              topic={topic}
              labCount={topicLabs.length}
              progress={progress}
              onClick={() => navigate(`/topic/${topic.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}

function TopicCard({ topic, labCount, progress, onClick }) {
  const progressPercent = progress.total > 0
    ? Math.round((progress.completed / progress.total) * 100)
    : 0;

  return (
    <article
      className="topic-card"
      onClick={onClick}
      style={{ '--topic-color': topic.color }}
    >
      <div className="topic-card-header">
        <div className="topic-icon">{topic.icon}</div>
        <div className="topic-info">
          <h3>{topic.name}</h3>
          <p>{topic.description}</p>
        </div>
      </div>

      <div className="topic-card-footer">
        <span className="topic-labs-count">{labCount} labs</span>
        <div className="topic-progress">
          {progress.completed}/{progress.total}
          {progressPercent === 100 && <span>✓</span>}
        </div>
      </div>
    </article>
  );
}

export default TopicList;
