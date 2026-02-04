import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Crystalline Truth Network',
  description: 'A decentralized platform for truth seekers and survivors',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              💎 Crystalline Truth Network
            </h1>
            <div className="flex gap-4">
              <a href="/" className="hover:text-purple-300 transition">Home</a>
              <a href="/forum" className="hover:text-purple-300 transition">Forum</a>
              <a href="/crystals" className="hover:text-purple-300 transition">Crystal View</a>
              <a href="/ai-support" className="hover:text-purple-300 transition">AI Support</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
