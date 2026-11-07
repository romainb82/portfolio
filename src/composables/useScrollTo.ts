/**
 * Défilement vers une section en tenant compte de la hauteur réelle du header sticky.
 * Partagé par le header, le menu mobile et le footer pour un comportement identique.
 */
export const HEADER_SELECTOR = 'header'

export function getHeaderOffset(): number {
    const header = document.querySelector<HTMLElement>(HEADER_SELECTOR)
    return header ? header.getBoundingClientRect().height + 8 : 0
}

export function scrollToSection(id: string): void {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

export function prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
