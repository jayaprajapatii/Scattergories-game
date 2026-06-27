import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import WaitingRoomPage from "./pages/WaitingRoomPage/WaitingRoomPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultPage from "./pages/ResultPage/ResultPage";
import CategorySelectionPage from "./pages/CategorySelectionPage/CategorySelectionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/category-selection"
        element={<CategorySelectionPage />}
      />

      <Route path="/waiting" element={<WaitingRoomPage />} />

      <Route path="/game" element={<GamePage />} />

      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;