'use client'

import { useState } from 'react'

import { SearchIcon, ArrowRightIcon, CalendarDaysIcon } from 'lucide-react'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { PostMetadata } from '@/lib/posts'

const BlogGrid = ({
  posts,
  onCategoryClick
}: {
  posts: PostMetadata[]
  onCategoryClick: (category: string) => void
}) => {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map((post, index) => (
        <Link key={index} href={`/blog/${post.slug}`}>
          <Card className='group h-full overflow-hidden shadow-none transition-all duration-300'>
            <CardContent className='space-y-3.5'>
              <div className='mb-6 overflow-hidden rounded-lg sm:mb-12'>
                <img
                  src={post.image}
                  alt={post.title}
                  className='h-59.5 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>
              <div className='flex items-center justify-between gap-1.5'>
                <div className='text-muted-foreground flex items-center gap-1.5'>
                  <CalendarDaysIcon className='size-6' />
                  <span className='text-muted-foreground'>
                    {new Date(post.publishedAt ?? '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit'
                    })}
                  </span>
                </div>
                <Badge
                  className='bg-primary/10 text-primary rounded-full text-sm'
                  onClick={e => {
                    e.preventDefault()
                    onCategoryClick(post.category ?? '')
                  }}
                >
                  {post.category}
                </Badge>
              </div>
              <h3 className='line-clamp-2 text-lg font-medium md:text-xl'>{post.title}</h3>
              <p className='text-muted-foreground line-clamp-2'>{post.description}</p>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium'>{post.author?.name}</p>
                <Button
                  size='icon'
                  variant='outline'
                  className='group-hover:bg-primary! group-hover:text-primary-foreground group-hover:border-primary hover:border-primary hover:bg-primary! hover:text-primary-foreground'
                >
                  <ArrowRightIcon className='size-4 -rotate-45' />
                  <span className='sr-only'>Read more: {post.title}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

const BlogSection = ({ posts }: { posts: PostMetadata[] }) => {
  const [selectedTab, setSelectedTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filterCategories = Array.from(new Set(posts.map(post => post.category))).filter(Boolean) as string[]
  const categories = ['All', ...filterCategories]

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab)
  }

  const filteredPosts = posts.filter(post => {
    // Category filter
    const matchesCategory = selectedTab === 'All' || post.category === selectedTab

    // Search filter
    if (!searchQuery) return matchesCategory

    const query = searchQuery.toLowerCase()

    const matchesSearch =
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.author?.name.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8'>
        {/* Header */}
        <div className='space-y-4 text-center'>
          <p className='text-sm font-medium uppercase'>Blogs</p>

          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Learn How High-Performing Products Grow</h2>

          <p className='text-muted-foreground mx-auto max-w-3xl text-xl'>
            Actionable insights, real-world strategies, and product analytics lessons to help you track what matters,
            move faster, and scale with confidence.
          </p>
        </div>

        {/* Tabs and Search */}
        <Tabs value={selectedTab} onValueChange={handleTabChange} className='gap-8 lg:gap-16'>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <TabsList className='gap-1'>
              {categories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className='hover:bg-primary/10 cursor-pointer rounded-lg px-4 text-base'
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className='relative max-md:w-full'>
              <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                <SearchIcon className='size-4' />
                <span className='sr-only'>Search</span>
              </div>
              <Input
                type='search'
                placeholder='Search insights or metrics'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='peer h-10 px-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none'
              />
            </div>
          </div>

          {/* Tabs Content */}
          {categories.map((category, index) => (
            <TabsContent key={index} value={category}>
              {filteredPosts.length > 0 ? (
                <BlogGrid posts={filteredPosts} onCategoryClick={handleTabChange} />
              ) : (
                <div className='text-muted-foreground flex min-h-100 flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center'>
                  <SearchIcon className='size-12 opacity-50' />
                  <div className='space-y-2'>
                    <h3 className='text-foreground text-lg font-medium'>No posts found</h3>
                    <p className='text-sm'>
                      {searchQuery
                        ? `No results in "${category}" for "${searchQuery}".`
                        : `No posts in "${category}" category yet.`}
                    </p>
                  </div>
                  {searchQuery && (
                    <Button variant='outline' size='sm' onClick={() => setSearchQuery('')}>
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default BlogSection
