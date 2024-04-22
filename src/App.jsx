import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Counter from "./pages/Counter"
import Header from "./components/common/header"
import Profile from "./pages/Profile"
import Stats from "./pages/Stats"

function App() { 
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/counter" element={<Counter />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/stats" element={<Stats />}/>
      </Routes>
    </Router>
  )
}

export default App
