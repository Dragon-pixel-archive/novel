import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

function NovelDetailPage() {
  const { slug } = useParams()
  const [novel, setNovel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get(`/novels/${slug}`)
      .then((res) => {
        setNovel(res.data.data)
      })
      .catch((err) => {
        setError('Không tải được thông tin truyện')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <p>Đang tải...</p>
  if (error) return <p>{error}</p>
  if (!novel) return <p>Không tìm thấy truyện</p>

  return (
    <section className="novel-detail">
      <div className="novel-header">
        <img src={novel.coverUrl} alt={novel.title} />
        <div>
          <h1>{novel.title}</h1>
          {novel.author && <p className="author">Tác giả: {novel.author}</p>}
          <span className={`status status-${novel.status}`}>{novel.status}</span>

          {novel.tags?.length > 0 && (
            <div className="tags">
              {novel.tags.map((t) => (
                <span key={t.tags.id} className="tag">{t.tags.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="description">{novel.description}</p>

      <div className="chapter-list">
        <h2>Danh sách chương</h2>
        {novel.chapters?.length > 0 ? (
          <ul>
            {novel.chapters.map((c) => (
              <li key={c.id}>
                <Link to={`/novel/${slug}/chapter/${c.chapterNumber}`}>
                  Chương {c.chapterNumber}: {c.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có chương nào</p>
        )}
      </div>
    </section>
  )
}

export default NovelDetailPage