import type { ComponentType } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

type ContactInfo = {
  title: string
  icon: ComponentType
  description: string
}[]

const ContactUs = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            Contact us
          </Badge>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Get in touch with us </h2>
          <p className='text-muted-foreground text-xl'>
            We eagerly look forward to warmly welcoming you very soon to our event. It promises to be a memorable
            experience filled with exciting activities.
          </p>
        </div>

        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/contact-us/image-1.png'
            alt='Contact illustration'
            className='size-full rounded-md object-cover max-lg:max-h-70'
          />

          <div>
            <h3 className='mb-2 text-2xl'>We’re here to serve you</h3>
            <p className='text-muted-foreground mb-10 text-lg'>
              We would love to hear from you, Whether you have a question, need a reservation, or want to learn more
              about our offerings, we’re here to assist.
            </p>

            {/* Contact Info Grid */}
            <div className='grid gap-6 sm:grid-cols-2'>
              {contactInfo.map((info, index) => (
                <Card className='bg-background shadow-none' key={index}>
                  <CardContent className='flex flex-col items-center gap-4 text-center'>
                    <Avatar className='size-9 border'>
                      <AvatarFallback className='bg-transparent [&>svg]:size-5'>
                        <info.icon />
                      </AvatarFallback>
                    </Avatar>
                    <div className='space-y-3'>
                      <h4 className='text-lg font-semibold'>{info.title}</h4>
                      <div className='text-muted-foreground text-base font-medium'>
                        {info.description.split('\n').map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
