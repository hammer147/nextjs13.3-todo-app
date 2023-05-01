import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Todo App',
  description: 'Created for practice'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='dark:bg-slate-800'>
        <Navbar />
        <main className='mx-auto min-h-screen max-w-xl bg-stone-200 p-4'>{children}</main>
      </body>
    </html>
  )
}
