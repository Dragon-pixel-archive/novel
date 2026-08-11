import { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../../services/api'

const emptyForm = { slug: '', title: '', author: '', description: '', cover_url: '', status: 'ongoing' }

function AdminNovelsPage() {
  const [novels, setNovels] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null) 
  const [form, setForm] = useState(emptyForm)
  const [uploadFile, setUploadFile] = useState(null)
  const [message, setMessage] = useState(null)

  const loadNovels = () => {
    setLoading(true)
    api.get('/novels')
      .then((res) => setNovels(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadNovels() }, [])

  const startCreate = () => {
    setEditingId('new')
    setForm(emptyForm)
    setMessage(null)
  }

  const startEdit = (novel) => {
    setEditingId(novel.id)
    setForm({
      slug: novel.slug,
      title: novel.title,
      author: novel.author || '',
      description: novel.description || '',
      cover_url: novel.coverUrl || '',
      status: novel.status,
    })
    setUploadFile(null)
    setMessage(null)
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
    slug: form.slug,
    title: form.title,
    status: form.status,
  }
  if (form.author.trim()) payload.author = form.author.trim()
  if (form.description.trim()) payload.description = form.description.trim()
  if (form.cover_url.trim()) payload.cover_url = form.cover_url.trim()
  return payload
}

const handleSubmit = async (e) => {
  e.preventDefault()
  setMessage(null)
  const payload = buildPayload()
  try {
    if (editingId === 'new') {
      await api.post('/admin/novels', payload)
      setMessage({ type: 'success', text: 'Đã tạo truyện' })
    } else {
      await api.put(`/admin/novels/${editingId}`, payload)
      setMessage({ type: 'success', text: 'Đã cập nhật truyện' })
    }
    cancelEdit()
    loadNovels()
  } catch (err) {
    setMessage({ type: 'error', text: err.response?.data?.message || 'Có lỗi xảy ra' })
  }
}

  const handleDelete = async (id) => {
    if (!confirm('Xoá truyện này? Hành động không thể hoàn tác.')) return
    try {
      await api.delete(`/admin/novels/${id}`)
      loadNovels()
    } catch (err) {
      alert(err.response?.data?.message || 'Xoá thất bại')
    }
  }

  const handleUpload = async () => {
    if (!uploadFile || editingId === 'new') return
    const formData = new FormData()
    formData.append('cover', uploadFile)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}admin/upload/${editingId}`, formData)
      setMessage({ type: 'success', text: 'Đã upload ảnh bìa' })
      setUploadFile(null)
      loadNovels()
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Upload thất bại' })
    }
  }

  return (
    <div className="admin-novels">
      <div className="admin-toolbar">
        <h2>Quản lý truyện</h2>
        {editingId === null && (
          <button onClick={startCreate}>+ Thêm truyện</button>
        )}
      </div>

      {message && <p className={`admin-message ${message.type}`}>{message.text}</p>}

      {editingId !== null && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Slug
            <input name="slug" value={form.slug} onChange={handleChange} required />
          </label>
          <label>
            Tiêu đề
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>
            Tác giả
            <input name="author" value={form.author} onChange={handleChange} />
          </label>
          <label>
            Mô tả
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
          </label>
          <label>
            Trạng thái
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="ongoing">Đang ra</option>
              <option value="completed">Hoàn thành</option>
              <option value="dropped">Đã drop</option>
            </select>
          </label>
          <label>
            URL ảnh bìa (nhập tay, tuỳ chọn)
            <input name="cover_url" value={form.cover_url} onChange={handleChange} />
          </label>

          {editingId !== 'new' && (
            <div className="upload-row">
              <label>
                Hoặc upload ảnh bìa trực tiếp
                <input type="file" accept="image/*" onChange={(e) => setUploadFile(e.target.files[0])} />
              </label>
              <button type="button" onClick={handleUpload} disabled={!uploadFile}>
                Upload
              </button>
            </div>
          )}

          <div className="form-actions">
            <button type="submit">{editingId === 'new' ? 'Tạo truyện' : 'Lưu thay đổi'}</button>
            <button type="button" onClick={cancelEdit}>Huỷ</button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Bìa</th>
              <th>Tiêu đề</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {novels.map((n) => (
              <tr key={n.id}>
                <td><img src={n.coverUrl} alt="" className="admin-thumb" /></td>
                <td>{n.title}</td>
                <td><span className={`status status-${n.status}`}>{n.status}</span></td>
                <td className="admin-row-actions">
                  <button onClick={() => startEdit(n)}>Sửa</button>
                  <button onClick={() => handleDelete(n.id)} className="danger">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminNovelsPage