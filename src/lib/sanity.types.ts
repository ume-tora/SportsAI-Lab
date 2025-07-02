export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: {
    current: string
  }
  mainImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    alt?: string
  }
  body: any[]
  author: Author
  categories?: Category[]
  tags?: Tag[]
  relatedPosts?: Post[]
  publishedAt?: string
  isFeatured: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  slug: {
    current: string
  }
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  bio?: any[]
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Tag {
  _id: string
  _type: 'tag'
  name: string
  slug: {
    current: string
  }
}