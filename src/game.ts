import shuffle from 'array-shuffle';
import { writable, type Readable } from 'svelte/store';

export interface GameOptions {
  words: string[];
  images: Record<string, string>;
  stepSize: number;
  stepCount: number;
}

export function planGame(options: GameOptions) {
  const focus = shuffle(options.words.filter(w => options.images[w])).slice(0, options.stepCount);
  const stepCount = Math.min(focus.length, options.stepCount);
  const fillers = shuffle(options.words.filter(w => !focus.includes(w))).slice(0, stepCount * (options.stepSize - 1) * 0.6);
  const gameWords = [...focus, ...fillers];
  return focus.map(target => ({
    target,
    image: options.images[target],
    getFillers: () => shuffle(gameWords.filter(w => w !== target)).slice(0, options.stepSize - 1),
  }));
}

interface Game {
  step: {
    target: string;
    image: string;
    fillers: string[];
  } | null;
  totalSteps: number;
  remainingSteps: number;
  attempt: number;
  images: string[];
}
export function game(options: GameOptions) {
  let plan = planGame(options);
  const totalSteps = plan.length;
  const getStep = () => plan.length ? { ...plan[0], fillers: plan[0].getFillers() } : null;
  const store = writable<Game>({
    step: getStep(),
    totalSteps,
    remainingSteps: plan.length,
    attempt: 0,
    images: plan.map(t => t.image),
  });
  return { 
    ...(store as Readable<Game>),
    next: (status: 'error' | 'success') => {
      plan = status === 'success' ? plan.slice(1) : shuffle(plan);
      store.update(s => ({
        step: getStep(),
        totalSteps,
        remainingSteps: plan.length,
        attempt: s.attempt + 1,
        images: s.images,
      }));
    },
  };
}