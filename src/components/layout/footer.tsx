import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'

import Link from 'next/link'

import { Separator } from '@/components/ui/separator'

import BistroLogo from '@/assets/svg/bistro-logo'
import { footerData } from '@/assets/data/footer'

const Footer = () => {
  return (
    <footer className='bg-muted' style={{ clipPath: 'polygon(0 16px, 100% 0, 100% 100%, 0 100%)' }}>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
        <Link href='/#home'>
          <div className='flex items-center gap-3'>
            <BistroLogo className='gap-3' />
            <span className='text-primary text-[20px] font-semibold'>Bistro</span>
          </div>
        </Link>

        <div className='flex items-center gap-5 whitespace-nowrap'>
          {footerData.map(item => (
            <Link
              key={item.title}
              href={item.href}
              className='text-muted-foreground hover:text-primary text-base! font-medium hover:bg-transparent'
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <Link href='#' target='_blank'>
            <FacebookIcon className='size-5' />
          </Link>
          <Link href='#' target='_blank'>
            <InstagramIcon className='size-5' />
          </Link>
          <Link href='#' target='_blank'>
            <TwitterIcon className='size-5' />
          </Link>
          <Link href='#' target='_blank'>
            <YoutubeIcon className='size-5' />
          </Link>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
        <p className='text-center font-medium text-balance'>
          {`©${new Date().getFullYear()}`}{' '}
          <Link href='/#home' className='hover:underline'>
            Bistro
          </Link>
          , Made with ❤️ for better web.
        </p>
      </div>
    </footer>
  )
}

export default Footer
