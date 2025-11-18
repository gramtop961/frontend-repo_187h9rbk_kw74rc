import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

import LandingPage from './pages/Landing'
import ExplorePage from './pages/Explore'
import AIPage from './pages/AI'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> 
          <Route index element={<LandingPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="ai" element={<AIPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
