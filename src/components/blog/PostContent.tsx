import { PortableText } from '@portabletext/react'
import { urlFor } from '../../lib/sanity.client'

interface PostContentProps {
  content: any[]
}

const PostContent = ({ content }: PostContentProps) => {
  const components = {
    types: {
      image: ({ value }: any) => (
        <div className="my-8">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            className="w-full rounded-lg shadow-md"
            loading="lazy"
          />
          {value.caption && (
            <p className="text-center text-gray-600 text-sm mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      ),
      code: ({ value }: any) => (
        <div className="my-8">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className={`language-${value.language || 'text'}`}>
              {value.code}
            </code>
          </pre>
          {value.filename && (
            <p className="text-sm text-gray-600 mt-2">{value.filename}</p>
          )}
        </div>
      ),
    },
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">{children}</h4>
      ),
      normal: ({ children }: any) => (
        <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-primary-500 pl-4 my-6 italic text-gray-600">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          className="text-primary-500 hover:text-primary-700 underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      strong: ({ children }: any) => (
        <strong className="font-bold text-gray-900">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic">{children}</em>
      ),
    },
  }

  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}

export default PostContent