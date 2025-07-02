import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'

const NotFound = () => {
  return (
    <>
      <SEO 
        title="ページが見つかりません" 
        description="お探しのページは見つかりませんでした。"
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ページが見つかりません
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            お探しのページは削除されたか、URLが間違っている可能性があります。
          </p>
          
          <div className="space-x-4">
            <Link 
              to="/" 
              className="btn-primary"
            >
              ホームに戻る
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              前のページに戻る
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound