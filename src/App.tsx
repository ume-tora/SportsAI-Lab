import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'
import Loading from './components/common/Loading'

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Category = lazy(() => import('./pages/Category'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:slug" element={<BlogPost />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  )
}

export default App
