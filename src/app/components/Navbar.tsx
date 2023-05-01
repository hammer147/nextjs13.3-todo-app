import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-10 bg-slate-600 p-4 drop-shadow-xl'>
      <div className='mx-auto flex max-w-xl justify-between sm:px-4'>
        <h1 className='mb-0 text-3xl font-bold'>
          <Link href='/' className='text-white/90 no-underline hover:text-white'>
            Next Todos
          </Link>
        </h1>

        <Link href='/add' className='text-2xl text-white/90 no-underline hover:text-white'>
          Add
        </Link>
      </div>
    </nav>
  )
}
