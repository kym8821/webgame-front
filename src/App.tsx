import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GamePage from './pages/gamePage/GamePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<GamePage />} path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
