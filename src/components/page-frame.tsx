import type { ReactNode } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { Footer } from '@/components/footer'
import { RightSidebar } from '@/components/right-sidebar'
import { StickyBottomCta } from '@/components/sticky-bottom-cta'

type PageFrameProps = {
  currentPath: string
  children: ReactNode
}

export function PageFrame({ currentPath, children }: PageFrameProps) {
  return (
    <div className="app-shell">
      <div className="app-shell__main">
        <main id="main-content" className="site-content">
          {children}
        </main>
        <Footer />
      </div>
      <RightSidebar />
      <StickyBottomCta hidden={currentPath === '/quote'} />
      <BottomNav currentPath={currentPath} />
    </div>
  )
}
