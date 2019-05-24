export interface CommentsReturns {
  total: number
  has_image_count: number
  list: List[]
}

interface List {
  id: string
  user_id: string
  activity_id: string
  content: string
  tag: string
  status: string
  created_at: string
  updated_at: string
  isLoaded: boolean
  name: string
  imgs: Img[]
}

interface Img {
  id: string
  comment_id: string
  img: string
  created_at: string
  updated_at: string
  isLoaded: boolean
}
