import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import { AppProvider } from '@/lib/store'

export const metadata: Metadata = {
  title: 'Student Dashboard Prototype',
  description: 'Your personal learning command center',
  icons: { icon: '/icon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <Sidebar />
            <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
              {children}
            </main>
          </div>
          <MobileNav />
        </AppProvider>
      </body>
    </html>
  )
}