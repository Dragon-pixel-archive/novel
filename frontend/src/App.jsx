import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import NovelDetailPage from './pages/NovelDetailPage'
import ChapterPage from './pages/ChapterPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/novel/:slug" element={<NovelDetailPage />} />
        <Route path="/novel/:slug/chapter/:chapterNumber" element={<ChapterPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default App