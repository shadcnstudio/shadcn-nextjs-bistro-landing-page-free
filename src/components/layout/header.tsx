'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { CalendarClockIcon, MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import MenuDropdown from '@/components/blocks/menu-dropdown'
import MenuNavigation from '@/components/blocks/menu-navigation'
import type { NavigationSection } from '@/components/blocks/menu-navigation'
import { ModeToggle } from '@/components/layout/mode-toggle'

import { cn } from '@/lib/utils'

import BistroLogo from '@/assets/svg/bistro-logo'

// Inline active section hook
const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const intersectingSections = entries.filter(entry => entry.isIntersecting)

        if (intersectingSections.length === 0) {
          setActiveSection('')
        } else {
          const mostVisible = intersectingSections.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          )

          setActiveSection(mostVisible.target.id)
        }
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: '-100px 0px -50% 0px'
      }
    )

    sectionIds.forEach(id => {
      const element = document.getElementById(id)

      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [sectionIds])

  return activeSection
}

type HeaderProps = {
  navigationData: NavigationSection[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  // Extract section IDs from navigation data - only include valid sections
  const sectionIds = navigationData.map(item => item.href?.replace('#', '')).filter(Boolean) as string[]

  // Only use active section if it's actually in our navigation list
  const detectedActiveSection = useActiveSection(sectionIds)
  const activeSection = sectionIds.includes(detectedActiveSection) ? detectedActiveSection : ''

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 h-16 w-full border-b transition-all duration-300',
        {
          'bg-background shadow-md': isScrolled
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/#home' className='flex items-center gap-3'>
          <BistroLogo />
          <span className='text-primary text-[20px] font-semibold'>Bistro</span>
        </Link>

        {/* Navigation */}
        <MenuNavigation
          navigationData={navigationData}
          activeSection={activeSection}
          className='max-lg:hidden [&_[data-slot="navigation-menu-list"]]:gap-1'
        />

        {/* Actions */}
        <div className='flex gap-4'>
          <ModeToggle />
          <Button className='rounded-full max-sm:hidden' asChild>
            <Link href='#contact-us'>Book table</Link>
          </Button>

          {/* Navigation for small screens */}
          <div className='flex gap-3'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size='icon' className='rounded-full sm:hidden' asChild>
                  <Link href='#'>
                    <CalendarClockIcon />
                    <span className='sr-only'>Book table</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Book table</TooltipContent>
            </Tooltip>

            <MenuDropdown
              align='end'
              navigationData={navigationData}
              activeSection={activeSection}
              trigger={
                <Button variant='outline' size='icon' className='rounded-full lg:hidden'>
                  <MenuIcon />
                  <span className='sr-only'>Menu</span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
