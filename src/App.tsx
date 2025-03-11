import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './views/Layout';
import DetectPose from './views/DetectPose';
import Home from './views/Home';

import Detected from './views/Detected';

import Result from './views/Result';

const App = () => {


  return (
<BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/face" element={<DetectPose />} /> {/* ✅ Add this */}
          <Route path="/detected" element={<Detected />} />
          <Route path="/result" element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
