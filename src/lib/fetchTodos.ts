import { todoSchema } from '@/types'
import { z } from 'zod'

export default async function fetchTodos() {
  const res = await fetch(`http://127.0.0.1:3500/todos`)
  if (!res.ok) return undefined
  const data = await res.json()
  const result = z.array(todoSchema).safeParse(data)
  return result.success ? result.data : undefined
}
