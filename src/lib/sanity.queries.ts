import { client } from './sanity.client'
import { withCache } from './cache'
import type { Post, Category, Author } from './sanity.types'

// 公開済み記事の取得（新しい順）
export async function getPosts(): Promise<Post[]> {
  return withCache('posts-all', () => 
    client.fetch(`
      *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        isFeatured,
        difficulty,
        author->{
          _id,
          name,
          slug,
          image
        },
        categories[]->{
          _id,
          title,
          slug
        },
        tags[]->{
          _id,
          name,
          slug
        },
        seo
      }
    `), 5
  )
}

// 注目記事の取得
export async function getFeaturedPosts(): Promise<Post[]> {
  return withCache('posts-featured', () =>
    client.fetch(`
      *[_type == "post" && defined(publishedAt) && isFeatured == true] | order(publishedAt desc) [0...3] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        isFeatured,
        difficulty,
        author->{
          _id,
          name,
          slug,
          image
        },
        categories[]->{
          _id,
          title,
          slug
        },
        seo
      }
    `), 5
  )
}

// スラッグで記事を取得
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return withCache(`post-${slug}`, () =>
    client.fetch(`
      *[_type == "post" && slug.current == $slug && defined(publishedAt)][0] {
        _id,
        title,
        slug,
        mainImage,
        body,
        publishedAt,
        isFeatured,
        difficulty,
        author->{
          _id,
          name,
          slug,
          image,
          bio
        },
        categories[]->{
          _id,
          title,
          slug,
          description
        },
        tags[]->{
          _id,
          name,
          slug
        },
        relatedPosts[]->{
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          author->{
            name
          }
        },
        seo
      }
    `, { slug }), 10 // Cache individual posts for longer
  )
}

// カテゴリ別記事の取得
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post" && defined(publishedAt) && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      isFeatured,
      difficulty,
      author->{
        _id,
        name,
        slug,
        image
      },
      categories[]->{
        _id,
        title,
        slug
      },
      tags[]->{
        _id,
        name,
        slug
      },
      seo
    }
  `, { categorySlug })
}

// 難易度別記事の取得
export async function getPostsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post" && defined(publishedAt) && difficulty == $difficulty] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      isFeatured,
      difficulty,
      author->{
        _id,
        name,
        slug,
        image
      },
      categories[]->{
        _id,
        title,
        slug
      },
      seo
    }
  `, { difficulty })
}

// 全カテゴリの取得
export async function getCategories(): Promise<Category[]> {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `)
}

// 全著者の取得
export async function getAuthors(): Promise<Author[]> {
  return client.fetch(`
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      bio
    }
  `)
}