import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'


export const metadata: Metadata = {
  title: 'Student Dashboard',
  description: 'Your personal learning center',
  icons: {
     icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: 'flex',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Sidebar />

          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              paddingBottom: '80px', // space for mobile nav
            }}
          >
            {children}
          </main>
        </div>

        <MobileNav />
      </body>
    </html>
  )
}