import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

import type { NavigationSection } from '@/components/blocks/menu-navigation'

import BistroLogo from '@/assets/svg/bistro-logo'

type FooterProps = {
  navigationData?: NavigationSection[]
}

const Footer = ({ navigationData = [] }: FooterProps) => {
  return (
    <footer className='bg-muted'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
        <a href='#'>
          <div className='flex items-center gap-3'>
            <BistroLogo className='gap-3' />
            <span className='text-primary text-[20px] font-semibold'>Bistro</span>
          </div>
        </a>

        <div className='flex items-center gap-5 whitespace-nowrap'>
          {navigationData.map(nav =>
            nav.href ? (
              <a
                key={nav.title}
                href={nav.href}
                className='text-muted-foreground hover:text-primary text-base! font-medium hover:bg-transparent'
              >
                {nav.title}
              </a>
            ) : (
              nav.items?.map(item => (
                <a
                  key={item.title}
                  href={item.href}
                  className='text-muted-foreground hover:text-primary text-base! font-medium hover:bg-transparent'
                >
                  {item.title}
                </a>
              ))
            )
          )}
        </div>

        <div className='flex items-center gap-4'>
          <a href='#'>
            <FacebookIcon className='size-5' />
          </a>
          <a href='#'>
            <InstagramIcon className='size-5' />
          </a>
          <a href='#'>
            <TwitterIcon className='size-5' />
          </a>
          <a href='#'>
            <YoutubeIcon className='size-5' />
          </a>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
        <p className='text-center font-medium text-balance'>
          {`©${new Date().getFullYear()}`}{' '}
          <a href='#' className='hover:underline'>
            Bistro
          </a>
          , Made with ❤️ for better web.
        </p>
      </div>
    </footer>
  )
}

export default Footer
