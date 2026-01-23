import Link from 'next/link'

import { Button } from '@/components/ui/button'

import Icon404 from '@/assets/svg/404'

const NotFound = () => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-9 p-6'>
      <Icon404 className='h-auto w-full sm:h-120 sm:w-146' />
      <div className='flex flex-col items-center gap-4 text-center'>
        <p className='text-muted-foreground text-xl sm:text-2xl'>We couldn&apos;t find the page you are looking for</p>
        <Button
          className='group relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
          asChild
        >
          <Link href='/'>Go back to home</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
