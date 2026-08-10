import { useState, useEffect } from 'react'
import api from '../../services/api'

const emptyForm = { chapterNumber: '', title: '', content: '' }

function AdminChaptersPage() {
  const [novels, setNovels] = useState([])
  const [selectedSlug, setSelectedSlug] = useState('')
  const [novel, setNovel] = useState(null) // chi tiết truyện đang chọn, gồm id + chapters
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null) // null = ẩn form, 'new' = tạo mới, số = đang sửa
  const [form, setForm] = useState(emptyForm)
  const [message, setMessage] = useState(null)

  // Load danh sách truyện cho dropdown, chỉ 1 lần
  useEffect(() => {
    api.get('/novels').then((res) => setNovels(res.data.data))
  }, [])

  const loadNovelDetail = (slug) => {
    if (!slug) {
      setNovel(null)
      return
    }
    setLoading(true)
    api.get(`/novels/${slug}`)
      .then((res) => setNovel(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  const handleSelectNovel = (e) => {
    const slug = e.target.value
    setSelectedSlug(slug)
    setEditingId(null)
    setMessage(null)
    loadNovelDetail(slug)
  }

  const startCreate = () => {
    setEditingId('new')
    setForm(emptyForm)
    setMessage(null)
  }

  const startEdit = async (chapter) => {
  setEditingId(chapter.id)
  setMessage(null)
  setForm({ chapterNumber: chapter.chapterNumber, title: chapter.title || '', content: '' })

  try {
    const res = await api.get(`/admin/chapters/${chapter.id}`)
    const full = res.data.data
    setForm({
      chapterNumber: full.chapterNumber,
      title: full.title || '',
      content: full.content || '',
    })
  } catch (err) {
    setMessage({ type: 'error', text: 'Không tải được nội dung chương, có thể sửa các trường khác nhưng nội dung sẽ giữ nguyên nếu để trống' })
  }
}

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const buildPayload = () => {
    const payload = {
      novelId: novel.id,
      chapterNumber: Number(form.chapterNumber),
    }
    if (form.title.trim()) payload.title = form.title.trim()
    if (form.content.trim()) payload.content = form.content.trim()
    return payload
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    try {
      if (editingId === 'new') {
        await api.post('/admin/chapters', buildPayload())
        setMessage({ type: 'success', text: 'Đã tạo chương' })
      } else {
        await api.put(`/admin/chapters/${editingId}`, buildPayload())
        setMessage({ type: 'success', text: 'Đã cập nhật chương' })
      }
      cancelEdit()
      loadNovelDetail(selectedSlug)
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Có lỗi xảy ra' })
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Xoá chương này?')) return
    try {
      await api.delete(`/admin/chapters/${id}`)
      loadNovelDetail(selectedSlug)
    } catch (err) {
      alert(err.response?.data?.message || 'Xoá thất bại')
    }
  }

  return (
    <div className="admin-chapters">
      <h2>Quản lý chương</h2>

      <label>
        Chọn truyện
        <select value={selectedSlug} onChange={handleSelectNovel}>
          <option value="">-- Chọn một truyện --</option>
          {novels.map((n) => (
            <option key={n.id} value={n.slug}>{n.title}</option>
          ))}
        </select>
      </label>

      {!novel && !loading && <p>Chọn một truyện để xem danh sách chương.</p>}
      {loading && <p>Đang tải...</p>}

      {novel && (
        <>
          <div className="admin-toolbar">
            <h3>{novel.title}</h3>
            {editingId === null && (
              <button onClick={startCreate}>+ Thêm chương</button>
            )}
          </div>

          {message && <p className={`admin-message ${message.type}`}>{message.text}</p>}

          {editingId !== null && (
            <form className="admin-form" onSubmit={handleSubmit}>
              <label>
                Số chương (vd: 1, 1.5)
                <input
                  name="chapterNumber"
                  type="number"
                  step="0.01"
                  value={form.chapterNumber}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Tiêu đề chương
                <input name="title" value={form.title} onChange={handleChange} />
              </label>
              <label>
                Nội dung
                {editingId !== 'new' && (
                  <span className="hint"> (để trống nếu không đổi nội dung)</span>
                )}
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={12}
                  required={editingId === 'new'}
                />
              </label>

              <div className="form-actions">
                <button type="submit">{editingId === 'new' ? 'Tạo chương' : 'Lưu thay đổi'}</button>
                <button type="button" onClick={cancelEdit}>Huỷ</button>
              </div>
            </form>
          )}

          <table className="admin-table">
            <thead>
              <tr>
                <th>Số</th>
                <th>Tiêu đề</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {novel.chapters?.map((c) => (
                <tr key={c.id}>
                  <td>{c.chapterNumber}</td>
                  <td>{c.title}</td>
                  <td className="admin-row-actions">
                    <button onClick={() => startEdit(c)}>Sửa</button>
                    <button onClick={() => handleDelete(c.id)} className="danger">Xoá</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default AdminChaptersPage