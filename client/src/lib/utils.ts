import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  
  if (element) {
    const yOffset = -80; // Adjust for navbar height
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}

export function animateNumber(
  el: HTMLElement,
  start: number,
  end: number,
  duration: number = 2000,
  suffix: string = ''
) {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);
    el.innerText = currentValue + suffix;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.innerText = end + suffix;
    }
  };
  
  window.requestAnimationFrame(step);
}
