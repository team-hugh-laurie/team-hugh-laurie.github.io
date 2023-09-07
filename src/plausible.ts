const g = typeof window === 'undefined' ? {} : window as any;
export const plausible: (e: string) => void = g.plausible || function() { (g.plausible.q = g.plausible.q || []).push(arguments) }
