import { Link } from 'react-router-dom'

function NovelCard({ novel }) {
  return (
    <Link to={`/novel/${novel.slug}`} className="novel-card">
      <img src={novel.coverUrl} alt={novel.title} />
      <div>
        <h3>{novel.title}</h3>
        {novel.author && <p className="author">{novel.author}</p>}
        <p className="description">{novel.description}</p>
        <span className={`status status-${novel.status}`}>{novel.status}</span>
      </div>
    </Link>
  )
}

export default NovelCard