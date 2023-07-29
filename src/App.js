import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Playlist } from "./pages/Playlist";
import { VideoDetail } from "./pages/VideoDetail";
import { WatchLater } from "./pages/WatchLater";
import { NotFound } from "./pages/NotFound";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <div className="view-flex">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/watchLater" element={<WatchLater />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
