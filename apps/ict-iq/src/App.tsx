import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/Shell';
import Home from './pages/Home';
import Test from './pages/Test';
import Results from './pages/Results';
import History from './pages/History';
import Admin from './pages/Admin';
export default function App() {
  return (<HashRouter><Shell><Routes>
    <Route path="/" element={<Home />} /><Route path="/test" element={<Test />} /><Route path="/results/:id" element={<Results />} />
    <Route path="/history" element={<History />} /><Route path="/admin" element={<Admin />} /><Route path="*" element={<Navigate to="/" />} />
  </Routes></Shell></HashRouter>);
}
