import { useState, useEffect } from 'react'
import api from '../services/api'
import NovelCard from '../components/NovelCard'

function HomePage() {
  const [novels, setNovels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/novels')
      .then((res) => {
        setNovels(res.data.data)
      })
      .catch((err) => {
        setError('Không tải được danh sách truyện')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Đang tải...</p>
  if (error) return <p>{error}</p>

  return (
    <section className="novel-list">
      {novels.length === 0 ? (
        <p>Chưa có truyện nào</p>
      ) : (
        novels.map((novel) => <NovelCard key={novel.id} novel={novel} />)
      )}
    </section>
  )
}

export default HomePage