import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Queue from './Components/Queue';
import Purchase from './Components/Purchase';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/purchase" element={<Purchase />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
