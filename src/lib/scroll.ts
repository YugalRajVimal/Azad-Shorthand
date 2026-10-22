import type Lenis from 'lenis';

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { instance = l; };

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToId(id: string) {
  const el = id === 'home' ? null : document.getElementById(id);
  if (instance && !prefersReduced()) {
    instance.scrollTo(el ?? 0, { offset: el ? -72 : 0, duration: 1.2 });
    return;
  }
  const behavior = prefersReduced() ? 'auto' : 'smooth';
  if (el) el.scrollIntoView({ behavior, block: 'start' });
  else window.scrollTo({ top: 0, behavior });
}
