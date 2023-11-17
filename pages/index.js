import Image from 'next/image'
import { Inter } from 'next/font/google'
import UpdateContnent from './UpdateContent'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-between w-full bg-white pt-10`}
    >
      <UpdateContnent/>
    </main>
  )
}
