import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Sports AI Lab</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              ホーム
            </Link>
            <Link to="/category/baseball" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              野球
            </Link>
            <Link to="/category/soccer" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              サッカー
            </Link>
            <Link to="/category/basketball" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              バスケ
            </Link>
            <Link to="/category/machine-learning" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              機械学習
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header