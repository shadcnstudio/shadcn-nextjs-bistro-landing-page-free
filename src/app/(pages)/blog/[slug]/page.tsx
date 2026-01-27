import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import MDXContent from '@/components/mdx-content'
import TableOfContents from '@/components/blog/table-of-contents'
import RelatedBlogSection from '@/components/blog/related-blog-section/related-blog-section'

import { getPostBySlug, getPosts } from '@/lib/posts'
import { extractHeadings } from '@/lib/extract-headings'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  const { metadata } = post

  return {
    title: `Blog: ${metadata.title}`,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${metadata.slug}`
    }
  }
}

export const dynamicParams = false

const BlogDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const allPosts = await getPosts()

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post

  // Find the current post index
  const currentPostIndex = allPosts.findIndex(p => p.slug === slug)
  const previousPost = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null
  const nextPost = currentPostIndex < allPosts.length - 1 ? allPosts[currentPostIndex + 1] : null

  const sameCategoryPosts = allPosts.filter(p => p.category === metadata.category && p.slug !== slug)
  const otherCategoryPosts = allPosts.filter(p => p.category !== metadata.category && p.slug !== slug)
  const relatedPosts = [...sameCategoryPosts, ...otherCategoryPosts].slice(0, 3)

  // Extract headings for TOC
  const headings = extractHeadings(content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#website`,
        name: 'Template Name',
        description: 'Template Description',
        url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        inLanguage: 'en-US'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#webpage`,
        name: `Blog: ${metadata.title}`,
        description: metadata.description,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${metadata.slug}`,
        isPartOf: {
          '@id': `${process.env.NEXT_PUBLIC_APP_URL}#website`
        },
        potentialAction: {
          '@type': 'ReadAction',
          target: [`${process.env.NEXT_PUBLIC_APP_URL}/blog/${metadata.slug}`]
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${process.env.NEXT_PUBLIC_APP_URL}`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${process.env.NEXT_PUBLIC_APP_URL}/blog`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: metadata.title,
            item: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${metadata.slug}`
          }
        ]
      }
    ]
  }

  return (
    <>
      <section className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 p-6 pb-8 sm:pb-16 lg:grid-cols-[250px_1fr]'>
        <aside className='hidden lg:block'>
          <TableOfContents headings={headings} />
        </aside>

        <div>
          <Breadcrumb className='mb-6'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/'>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/blog'>Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{metadata.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className='mb-8 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src={metadata.author?.picture} alt={metadata.author?.name} />
                <AvatarFallback>{metadata.author?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='text-muted-foreground text-sm'>Written by</span>
                <span>{metadata.author?.name}</span>
              </div>
            </div>

            <div className='flex flex-col'>
              <span className='text-muted-foreground text-sm'>Read Time</span>
              <span>{metadata.readTime}</span>
            </div>

            <div className='flex flex-col'>
              <span className='text-muted-foreground text-sm'>Posted on</span>
              <span>
                {new Date(metadata.publishedAt ?? '').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit'
                })}
              </span>
            </div>
          </div>

          <img src={metadata.image} alt={metadata.title} className='mx-auto mb-8 max-w-xl rounded-xl' />

          <MDXContent source={content} />

          <div className='flex items-center justify-between gap-4 pt-8 sm:pt-16'>
            {previousPost ? (
              <Button asChild>
                <Link href={`/blog/${previousPost.slug}`}>Previous Post</Link>
              </Button>
            ) : (
              <Button disabled>Previous Post</Button>
            )}
            {nextPost ? (
              <Button asChild>
                <Link href={`/blog/${nextPost.slug}`}>Next Post</Link>
              </Button>
            ) : (
              <Button disabled>Next Post</Button>
            )}
          </div>
        </div>
      </section>

      <RelatedBlogSection posts={relatedPosts} />

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

export default BlogDetailsPage
