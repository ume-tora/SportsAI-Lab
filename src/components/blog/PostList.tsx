import PostCard from './PostCard'
import type { Post } from '../../lib/sanity.types'

interface PostListProps {
  posts: Post[]
  title?: string
  featured?: boolean
}

const PostList = ({ posts, title, featured = false }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">記事が見つかりませんでした。</p>
      </div>
    )
  }

  return (
    <section className="py-12">
      {title && (
        <div className="container mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
      )}
      
      <div className="container">
        {featured && posts.length > 0 && (
          <div className="mb-12">
            <PostCard post={posts[0]} featured={true} />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(featured ? posts.slice(1) : posts).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PostList