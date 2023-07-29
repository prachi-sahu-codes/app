import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Playlist } from "./pages/Playlist";
import { VideoDetail } from "./pages/VideoDetail";
import { WatchLater } from "./pages/WatchLater";
import { NotFound } from "./pages/NotFound";
import { Header } from "./components/Header";
import { Category } from "./pages/Category";
import { PlaylistDetail } from "./pages/PlaylistDetail";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="view-flex">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/watchLater" element={<WatchLater />} />
          <Route path="/video/:videoId" element={<VideoDetail />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
