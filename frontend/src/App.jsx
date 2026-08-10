import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NovelDetailPage from "./pages/NovelDetailPage";
import ChapterPage from "./pages/ChapterPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminNovelsPage from "./pages/admin/AdminNovelsPage";
import AdminChaptersPage from "./pages/admin/AdminChaptersPage";
import AdminTagsPage from "./pages/admin/AdminTagsPage";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/novel/:slug" element={<NovelDetailPage />} />
          <Route
            path="/novel/:slug/chapter/:chapterNumber"
            element={<ChapterPage />}
          />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="novels" replace />} />
            <Route path="novels" element={<AdminNovelsPage />} />
            <Route path="chapters" element={<AdminChaptersPage />} />
            <Route path="tags" element={<AdminTagsPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
