import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedAt?: string
  author?: string
}

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  publishedAt,
  author 
}: SEOProps) => {
  const siteTitle = 'Sports AI Lab'
  const siteDescription = 'スポーツとAI技術の融合を探求するブログ'
  const siteUrl = 'https://sports-ai-lab.com'
  
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const metaDescription = description || siteDescription
  const metaImage = image || `${siteUrl}/og-image.jpg`
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* Article specific */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={metaUrl} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          headline: title,
          description: metaDescription,
          image: metaImage,
          url: metaUrl,
          ...(type === 'article' && {
            author: {
              '@type': 'Person',
              name: author,
            },
            publisher: {
              '@type': 'Organization',
              name: siteTitle,
            },
            datePublished: publishedAt,
          }),
        })}
      </script>
    </Helmet>
  )
}

export default SEO