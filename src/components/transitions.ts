import type { TransitionConfig } from 'svelte/transition';
import { fade } from 'svelte/transition';
import { cubicIn } from 'svelte/easing';

export function fadeOut(node: HTMLElement) {
  const { top, left, width } = node.getBoundingClientRect();
  node.style.position = 'fixed';
  node.style.top = `${top}px`;
  node.style.left = `${left}px`;
  node.style.width = `${width}px`;
  return fade(node, { duration: 400 });
}

export function screenSlide(_node: HTMLElement): TransitionConfig {
  return {
    duration: 400,
    easing: cubicIn,
    css: t => `position: relative; opacity: ${t}; transform: translate3d(${(1 - t) * 100}%, 0, 0)`
  };
}