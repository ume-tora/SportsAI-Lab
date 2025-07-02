import { useState, useEffect } from 'react'
import SEO from '../components/common/SEO'
import Loading from '../components/common/Loading'
import PostList from '../components/blog/PostList'
import { getPosts, getFeaturedPosts } from '../lib/sanity.queries'
import type { Post } from '../lib/sanity.types'

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [allPosts, featured] = await Promise.all([
          getPosts(),
          getFeaturedPosts(),
        ])
        setPosts(allPosts.slice(0, 9)) // 最新9件を表示
        setFeaturedPosts(featured)
      } catch (err) {
        setError('記事の取得に失敗しました')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Loading />
  
  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="ホーム"
        description="スポーツとAI技術の融合を探求するブログ。機械学習、データサイエンス、統計分析を活用したスポーツ分析の最新情報をお届けします。"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Sports AI Lab
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              スポーツとAI技術の融合を探求し、データサイエンスの力で<br />
              スポーツの新たな可能性を発見するブログです
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                機械学習
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                データサイエンス
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                統計分析
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                スポーツ分析
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <PostList posts={featuredPosts} title="注目記事" featured={true} />
      )}

      {/* Latest Posts */}
      <PostList posts={posts} title="最新記事" />

      {/* Categories Preview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            カテゴリ別記事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: '野球', slug: 'baseball', icon: '⚾' },
              { name: 'サッカー', slug: 'soccer', icon: '⚽' },
              { name: 'バスケットボール', slug: 'basketball', icon: '🏀' },
              { name: '機械学習', slug: 'machine-learning', icon: '🤖' },
            ].map((category) => (
              <a
                key={category.slug}
                href={`/category/${category.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {category.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home