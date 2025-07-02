export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function getDifficultyLabel(difficulty: string): string {
  const labels = {
    beginner: '初心者',
    intermediate: '中級者',
    advanced: '上級者',
  }
  return labels[difficulty as keyof typeof labels] || difficulty
}

export function getDifficultyColor(difficulty: string): string {
  const colors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }
  return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}