import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import Loading from '../components/common/Loading'
import PostContent from '../components/blog/PostContent'
import PostCard from '../components/blog/PostCard'
import { getPostBySlug } from '../lib/sanity.queries'
import { urlFor } from '../lib/sanity.client'
import { formatDate, getDifficultyLabel, getDifficultyColor } from '../utils/formatDate'
import type { Post } from '../lib/sanity.types'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('記事が見つかりません')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const postData = await getPostBySlug(slug)
        if (!postData) {
          setError('記事が見つかりません')
        } else {
          setPost(postData)
        }
      } catch (err) {
        setError('記事の取得に失敗しました')
        console.error('Error fetching post:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) return <Loading />
  
  if (error || !post) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            記事が見つかりません
          </h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link 
            to="/" 
            className="btn-primary inline-block"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined

  return (
    <>
      <SEO
        title={post.seo?.metaTitle || post.title}
        description={post.seo?.metaDescription}
        image={imageUrl}
        url={`/post/${post.slug.current}`}
        type="article"
        publishedAt={post.publishedAt}
        author={post.author.name}
      />

      <article className="py-12">
        <div className="container max-w-4xl">
          {/* Header */}
          <header className="mb-8">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.categories?.map((category) => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug.current}`}
                  className="text-primary-500 text-sm font-medium hover:text-primary-700 transition-colors"
                >
                  {category.title}
                </Link>
              ))}
              <span className={`px-2 py-1 rounded-md text-xs font-medium ml-2 ${getDifficultyColor(post.difficulty)}`}>
                {getDifficultyLabel(post.difficulty)}
              </span>
              {post.isFeatured && (
                <span className="bg-secondary-500 text-white px-2 py-1 rounded-md text-xs font-medium ml-2">
                  注目
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-3">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(48).height(48).url()}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <time dateTime={post.publishedAt} className="text-sm">
                    {formatDate(post.publishedAt!)}
                  </time>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="mb-8">
              <img
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <PostContent content={post.body} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.author.bio && (
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-4">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {post.author.name}
                  </h4>
                  <div className="prose prose-sm">
                    <PostContent content={post.author.bio} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost._id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}

export default BlogPost