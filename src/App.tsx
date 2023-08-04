import './App.css';
import { ProjectDetailView } from './projects/ProjectDetailView';
import { ProjectView } from './projects/ProjectView';
import { HashRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <nav>
          <Link to="/projects">Projects</Link>
        </nav>
        <Routes>
          <Route index path="/" element={<ProjectView />} />
          <Route path="/projects" element={<ProjectView />} />
          <Route path="/projects/project" element={<ProjectDetailView />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
