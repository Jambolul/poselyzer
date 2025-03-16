import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './views/Layout';
import DetectPose from './views/DetectPose';
import Home from './views/Home';


const App = () => {


  return (
<BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/face" element={<DetectPose />} /> {/* ✅ Add this */}
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
