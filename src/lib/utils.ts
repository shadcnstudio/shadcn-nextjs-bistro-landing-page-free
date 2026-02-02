import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Smooth scroll to an in-page section and update the URL hash without
// creating an extra history entry.
export function scrollToSection(sectionId: string, headerHeight = 80) {
  if (typeof window === 'undefined' || !sectionId) return

  const element = document.getElementById(sectionId)

  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })

    // Update the URL hash to reflect the visible section but don't add
    // a new history entry so clicking the same link will still trigger
    // the scroll handler if needed.
    try {
      history.replaceState(null, '', `#${sectionId}`)
    } catch {
      // fallback to setting location.hash
      window.location.hash = `#${sectionId}`
    }
  }
}
