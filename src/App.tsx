import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './views/Layout';
import DetectPose from './views/DetectPose';
import Home from './views/Home';
import Instructions from './views/Instructions';


const App = () => {


  return (
<BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/DetectPose" element={<DetectPose />} /> {/* ✅ Add this */}
          <Route path="/instructions" element={<Instructions />} />

        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
