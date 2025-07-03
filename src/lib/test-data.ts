// Temporary test data for development
export const testPosts = [
  {
    _id: 'test-1',
    _type: 'post',
    title: 'AIが変えるスポーツ分析の未来',
    slug: { current: 'ai-sports-analysis-future' },
    publishedAt: new Date().toISOString(),
    isFeatured: true,
    difficulty: 'beginner',
    author: {
      _id: 'author-1',
      _type: 'author',
      name: 'Sports AI Lab編集部',
      slug: { current: 'sports-ai-lab-editorial' }
    },
    categories: [
      {
        _id: 'cat-1',
        _type: 'category',
        title: '機械学習',
        slug: { current: 'machine-learning' }
      }
    ],
    seo: {
      metaTitle: 'AIが変えるスポーツ分析の未来',
      metaDescription: 'スポーツ業界におけるAI技術の活用事例について解説します。'
    }
  }
];

export const testCategories = [
  {
    _id: 'cat-1',
    _type: 'category',
    title: '機械学習',
    slug: { current: 'machine-learning' }
  }
];

export const testAuthors = [
  {
    _id: 'author-1',
    _type: 'author',
    name: 'Sports AI Lab編集部',
    slug: { current: 'sports-ai-lab-editorial' }
  }
];