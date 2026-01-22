import HeroSectionPage from '@/components/blocks/hero-section/hero-section'
import PopularDishes from '@/components/blocks/popular-dishes/popular-dishes'
import AboutUs from '@/components/blocks/about-us-section/about-us-page'
import Testimonials from '@/components/blocks/testimonials-section/testimonials-section'
import NewItems from '@/components/blocks/new-items-section/new-items'
import ContactUs from '@/components/blocks/contact-us-section/contact-us-page'
import Offers from '@/components/blocks/offers-section/offers-section'

import { menudata } from '@/assets/data/hero'
import { popularDishes } from '@/assets/data/popular-dishes'
import { stats } from '@/assets/data/about-us'
import { testimonials } from '@/assets/data/testimonials'
import { newItems } from '@/assets/data/new-items'
import { contactInfo } from '@/assets/data/contact-us'
import { GalleryImage } from '@/assets/data/offers'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${process.env.NEXT_PUBLIC_APP_URL}#website`,
      name: 'Bistro',
      description:
        'Enjoy fresh ingredients, thoughtfully prepared meals, and a welcoming space designed for memorable moments. Experience bistro dining made simple and delicious.',
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      inLanguage: 'en-US'
    }
  ]
}

const Home = () => {
  return (
    <>
      <HeroSectionPage menudata={menudata} />
      <PopularDishes popularDishes={popularDishes} />
      <AboutUs stats={stats} />
      <Testimonials testimonials={testimonials} />
      <NewItems newItems={newItems} />
      <ContactUs contactInfo={contactInfo} />
      <Offers galleryImage={GalleryImage} />
      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default Home
