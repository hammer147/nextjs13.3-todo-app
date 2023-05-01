'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useTransition, FormEvent, ChangeEvent } from 'react'
import { Todo } from '@/types'

const initState: Partial<Todo> = {
  userId: 1,
  title: '',
  completed: false
}

export default function AddTodo() {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState(initState)

  const isMutating = isFetching || isPending

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { userId, title, completed } = data

    setIsFetching(true)

    const res = await fetch(`http://127.0.0.1:3500/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        title,
        completed
      })
    })

    await res.json()

    setIsFetching(false)

    setData(prevData => ({
      ...prevData,
      title: ''
    }))

    startTransition(() => {
      if (pathname === '/add') {
        router.push('/')
      } else {
        // Refresh the current route and fetch new data
        // from the server without losing
        // client-side browser or React state.
        router.refresh()
      }
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name

    setData(prevData => ({
      ...prevData,
      [name]: e.target.value
    }))
  }

  const content = (
    <form
      onSubmit={handleSubmit}
      className='flex items-center gap-2'
      style={{ opacity: !isMutating ? 1 : 0.7 }}>
      <input
        type='text'
        id='title'
        name='title'
        value={data.title}
        onChange={handleChange}
        className='w-full flex-grow rounded-lg p-1 text-2xl'
        placeholder='New Todo'
        autoFocus
      />

      <button
        type='submit'
        className='max-w-xs rounded-2xl border-2 border-solid border-black bg-green-500 p-2 text-xl text-black hover:cursor-pointer hover:bg-green-400'>
        Submit
      </button>
    </form>
  )

  return content
}
