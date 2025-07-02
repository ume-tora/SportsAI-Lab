const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold">Sports AI Lab</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              スポーツとAI技術の融合を探求し、データサイエンスの力でスポーツの新たな可能性を発見するブログです。
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">カテゴリ</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/category/baseball" className="hover:text-white transition-colors">野球</a></li>
              <li><a href="/category/soccer" className="hover:text-white transition-colors">サッカー</a></li>
              <li><a href="/category/basketball" className="hover:text-white transition-colors">バスケットボール</a></li>
              <li><a href="/category/machine-learning" className="hover:text-white transition-colors">機械学習</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">難易度別</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/difficulty/beginner" className="hover:text-white transition-colors">初心者向け</a></li>
              <li><a href="/difficulty/intermediate" className="hover:text-white transition-colors">中級者向け</a></li>
              <li><a href="/difficulty/advanced" className="hover:text-white transition-colors">上級者向け</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Sports AI Lab. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                プライバシーポリシー
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                利用規約
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer