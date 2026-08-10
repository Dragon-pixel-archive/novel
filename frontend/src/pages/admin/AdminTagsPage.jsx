import { useState, useEffect } from 'react'
import api from '../../services/api'

function AdminTagsPage() {
  const [tags, setTags] = useState([])
  const [novels, setNovels] = useState([])
  const [selectedSlug, setSelectedSlug] = useState('')
  const [novel, setNovel] = useState(null)
  const [newTagName, setNewTagName] = useState('')
  const [message, setMessage] = useState(null)

  const loadTags = () => {
    api.get('/tags').then((res) => setTags(res.data.data))
  }

  useEffect(() => {
    loadTags()
    api.get('/novels').then((res) => setNovels(res.data.data))
  }, [])

  const loadNovelDetail = (slug) => {
    if (!slug) {
      setNovel(null)
      return
    }
    api.get(`/novels/${slug}`).then((res) => setNovel(res.data.data))
  }

  const handleSelectNovel = (e) => {
    const slug = e.target.value
    setSelectedSlug(slug)
    setMessage(null)
    loadNovelDetail(slug)
  }

  // ---- Quản lý tag toàn hệ thống ----
  const handleCreateTag = async (e) => {
    e.preventDefault()
    setMessage(null)
    try {
      await api.post('/admin/tags', { name: newTagName.trim() })
      setNewTagName('')
      loadTags()
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Tạo tag thất bại' })
    }
  }

  const handleDeleteTag = async (id) => {
    if (!confirm('Xoá tag này khỏi toàn hệ thống? Sẽ gỡ khỏi mọi truyện đang gắn tag này.')) return
    try {
      await api.delete(`/admin/tags/${id}`)
      loadTags()
      if (selectedSlug) loadNovelDetail(selectedSlug) // đồng bộ lại nếu tag vừa xoá đang gắn ở truyện đang xem
    } catch (err) {
      alert(err.response?.data?.message || 'Xoá thất bại')
    }
  }

  // ---- Gán / gỡ tag cho truyện đang chọn ----
  const novelTagIds = novel?.tags?.map((t) => t.tags.id) ?? []

  const handleAssignTag = async (tagId) => {
    setMessage(null)
    try {
      await api.post(`/admin/novels/${novel.id}/tags/${tagId}`)
      loadNovelDetail(selectedSlug)
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Gán tag thất bại' })
    }
  }

  const handleRemoveTag = async (tagId) => {
    setMessage(null)
    try {
      await api.delete(`/admin/novels/${novel.id}/tags/${tagId}`)
      loadNovelDetail(selectedSlug)
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Gỡ tag thất bại' })
    }
  }

  return (
    <div className="admin-tags">
      <h2>Quản lý tag</h2>

      <section>
        <h3>Tất cả tag</h3>
        <form className="tag-create-form" onSubmit={handleCreateTag}>
          <input
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Tên tag mới"
            required
          />
          <button type="submit">+ Thêm tag</button>
        </form>

        <div className="tag-chip-list">
          {tags.map((t) => (
            <span key={t.id} className="tag-chip">
              {t.name}
              <button onClick={() => handleDeleteTag(t.id)} title="Xoá tag khỏi hệ thống">×</button>
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3>Gán tag cho truyện</h3>
        <label>
          Chọn truyện
          <select value={selectedSlug} onChange={handleSelectNovel}>
            <option value="">-- Chọn một truyện --</option>
            {novels.map((n) => (
              <option key={n.id} value={n.slug}>{n.title}</option>
            ))}
          </select>
        </label>

        {message && <p className={`admin-message ${message.type}`}>{message.text}</p>}

        {novel && (
          <>
            <p className="hint">Tag hiện có của "{novel.title}":</p>
            <div className="tag-chip-list">
              {novel.tags?.length > 0 ? (
                novel.tags.map((t) => (
                  <span key={t.tags.id} className="tag-chip active">
                    {t.tags.name}
                    <button onClick={() => handleRemoveTag(t.tags.id)} title="Gỡ khỏi truyện">×</button>
                  </span>
                ))
              ) : (
                <span className="hint">Chưa có tag nào</span>
              )}
            </div>

            <p className="hint">Bấm để thêm tag còn lại:</p>
            <div className="tag-chip-list">
              {tags
                .filter((t) => !novelTagIds.includes(t.id))
                .map((t) => (
                  <button key={t.id} className="tag-chip addable" onClick={() => handleAssignTag(t.id)}>
                    + {t.name}
                  </button>
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default AdminTagsPage