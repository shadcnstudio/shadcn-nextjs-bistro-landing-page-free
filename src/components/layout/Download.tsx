// Next Imports
import Link from 'next/link'

// Component Imports
import { Button } from '@/components/ui/button'

const BuyNowButton = () => {
  return (
    <Button asChild className='animate-heartbeat fixed right-15 bottom-8 z-70'>
      <Link href='https://shadcnstudio.com/templates/bistro-restaurant-template-free' target='_blank'>
        Download
      </Link>
    </Button>
  )
}

export default BuyNowButton
