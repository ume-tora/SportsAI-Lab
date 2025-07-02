import { Link } from 'react-router-dom'
import { urlFor } from '../../lib/sanity.client'
import { formatDate, getDifficultyLabel, getDifficultyColor } from '../../utils/formatDate'
import type { Post } from '../../lib/sanity.types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(600).height(400).url()
    : '/placeholder-image.jpg'

  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
      featured ? 'md:flex' : ''
    }`}>
      <div className={`relative ${featured ? 'md:w-1/2' : ''}`}>
        <Link to={`/post/${post.slug.current}`}>
          <img
            src={imageUrl}
            alt={post.title}
            className={`w-full object-cover ${
              featured ? 'h-64 md:h-full' : 'h-48'
            }`}
            loading="lazy"
          />
        </Link>
        {post.isFeatured && (
          <div className="absolute top-4 left-4">
            <span className="bg-secondary-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              注目
            </span>
          </div>
        )}
        <div className="absolute bottom-4 right-4">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
            {getDifficultyLabel(post.difficulty)}
          </span>
        </div>
      </div>
      
      <div className={`p-6 ${featured ? 'md:w-1/2' : ''}`}>
        <div className="flex items-center space-x-2 mb-3">
          {post.categories?.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.slug.current}`}
              className="text-primary-500 text-sm font-medium hover:text-primary-700 transition-colors"
            >
              {category.title}
            </Link>
          ))}
        </div>
        
        <h2 className={`font-bold text-gray-900 mb-3 line-clamp-2 ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          <Link 
            to={`/post/${post.slug.current}`}
            className="hover:text-primary-500 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        
        {post.seo?.metaDescription && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.seo.metaDescription}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {post.author.image && (
              <img
                src={urlFor(post.author.image).width(32).height(32).url()}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{post.author.name}</span>
          </div>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt!)}
          </time>
        </div>
      </div>
    </article>
  )
}

export default PostCard