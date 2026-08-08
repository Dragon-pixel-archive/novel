import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

function ChapterPage() {
  const { slug, chapterNumber } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get(`/novels/${slug}/chapters/${chapterNumber}`)
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        setError('Không tải được nội dung chương')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [slug, chapterNumber])

  if (loading) return <p>Đang tải...</p>
  if (error) return <p>{error}</p>
  if (!data) return <p>Không tìm thấy chương</p>

  const { novel, chapter, prevChapterNumber, nextChapterNumber } = data

  return (
    <section className="chapter-page">
      <Link to={`/novel/${novel.slug}`} className="back-link">
        ← {novel.title}
      </Link>

      <h1>Chương {chapter.chapterNumber}: {chapter.title}</h1>

      <div className="chapter-content">
        {chapter.content}
      </div>

      <div className="chapter-nav">
        {prevChapterNumber ? (
          <Link to={`/novel/${slug}/chapter/${prevChapterNumber}`}>← Chương trước</Link>
        ) : (
          <span className="disabled">← Chương trước</span>
        )}

        {nextChapterNumber ? (
          <Link to={`/novel/${slug}/chapter/${nextChapterNumber}`}>Chương sau →</Link>
        ) : (
          <span className="disabled">Chương sau →</span>
        )}
      </div>
    </section>
  )
}

export default ChapterPage