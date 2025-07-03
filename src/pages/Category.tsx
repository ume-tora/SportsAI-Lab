import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SEO from '../components/common/SEO'
import Loading from '../components/common/Loading'
import PostCard from '../components/blog/PostCard'
import { getPostsByCategory } from '../lib/sanity.queries'
import type { Post } from '../lib/sanity.types'

const Category = () => {
  const { slug } = useParams<{ slug: string }>()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categoryNames: Record<string, string> = {
    'baseball': '野球',
    'soccer': 'サッカー',
    'basketball': 'バスケットボール',
    'machine-learning': '機械学習',
    'deep-learning': '深層学習',
    'statistics': '統計分析',
  }

  const categoryName = slug ? categoryNames[slug] || slug : 'カテゴリ'

  useEffect(() => {
    const fetchPosts = async () => {
      if (!slug) {
        setError('カテゴリが見つかりません')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const postsData = await getPostsByCategory(slug)
        setPosts(postsData || [])
      } catch (err) {
        setError('記事の取得に失敗しました')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [slug])

  if (loading) return <Loading />

  return (
    <>
      <SEO
        title={`${categoryName}の記事`}
        description={`${categoryName}に関する記事一覧。スポーツとAI技術の融合を探求する専門的な記事をお届けします。`}
        url={`/category/${slug}`}
      />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-gray-600">
              {categoryName}に関する記事一覧
            </p>
          </div>

          {error ? (
            <div className="text-center">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {categoryName}の記事はまだありません。
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Category