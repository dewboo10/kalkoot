import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Rights from './pages/Rights'
import Documents from './pages/Documents'
import Officials from './pages/Officials'
import Tracker from './pages/Tracker'
import Community from './pages/Community'
import About from './pages/About'
import Start from './pages/Start'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/"             element={<Home />} />
            <Route path="/rights"       element={<Rights />} />
            <Route path="/documents"    element={<Documents />} />
            <Route path="/officials"    element={<Officials />} />
            <Route path="/tracker"      element={<Tracker />} />
            <Route path="/community"    element={<Community />} />
            <Route path="/about"        element={<About />} />
            <Route path="/start"        element={<Start />} />
            <Route path="/start/:type"  element={<Start />} />
            {/* catch-all */}
            <Route path="*"             element={<NotFound />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  )
}
