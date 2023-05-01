'use client'

import { FaTrash } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useTransition, ChangeEvent, MouseEvent } from 'react'
import Link from 'next/link'
import { Todo } from '@/types'


type Props = { todo: Todo }

export default function Todo({ todo }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  const isMutating = isFetching || isPending

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsFetching(true)

    const res = await fetch(`http://127.0.0.1:3500/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed
      })
    })

    await res.json()

    setIsFetching(false)

    startTransition(() => {
      // Refresh the current route and fetch new data
      // from the server without losing
      // client-side browser or React state.
      router.refresh()
    })
  }

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsFetching(true)

    const res = await fetch(`http://127.0.0.1:3500/todos/${todo.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: todo.id
      })
    })

    await res.json()

    setIsFetching(false)

    startTransition(() => {
      if (pathname.startsWith('/edit/')) {
        router.push('/')
      } else {
        // Refresh the current route and fetch new data
        // from the server without losing
        // client-side browser or React state.
        router.refresh()
      }
    })
  }

  return (
    <article
      className='my-4 flex items-center justify-between'
      style={{ opacity: !isMutating ? 1 : 0.7 }}>
      <label className='text-2xl hover:underline'>
        <Link href={`/edit/${todo.id}`}>{todo.title}</Link>
      </label>
      <div className='flex items-center gap-4'>
        <input
          type='checkbox'
          checked={todo.completed}
          id='completed'
          name='completed'
          onChange={handleChange}
          disabled={isPending}
          className='min-h-[2rem] min-w-[2rem]'
        />

        <button
          onClick={handleDelete}
          disabled={isPending}
          className='max-w-xs rounded-2xl border-2 border-solid border-black bg-red-400 p-3 text-xl text-black hover:cursor-pointer hover:bg-red-300'>
          <FaTrash />
        </button>
      </div>
    </article>
  )
}
