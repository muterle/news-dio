import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Post from "./containers/Post";

function App() {
  return (
    <main>
      <section>
        <Router>
          <Routes>
            <Route path="/:subject/:id" element={<Post />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </section>
    </main>
  );
}

export default App;
