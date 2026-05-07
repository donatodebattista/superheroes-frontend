import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroesPage from './pages/HeroesPage'
import HeroDetailPage from './pages/HeroDetailPage'
import EditHeroPage from './pages/EditHeroPage'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"       element={<HeroesPage filter="all"    />} />
          <Route path="/marvel" element={<HeroesPage filter="marvel" />} />
          <Route path="/dc"     element={<HeroesPage filter="dc"     />} />
          <Route path="/hero/:id"  element={<HeroDetailPage />} />
          <Route path="/new"       element={<EditHeroPage />} />
          <Route path="/edit/:id"  element={<EditHeroPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
