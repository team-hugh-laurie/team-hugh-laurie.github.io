import { describe, expect, it } from 'vitest';
import { planGame, game } from './planGame';
import { get } from 'svelte/store';

const options: Parameters<typeof planGame>[0] = {
  words: ['sun', 'moon', 'tree', 'rabbit', 'snail', 'ship', 'cloud', 'mire', 'horror', 'good', 'heart'],
  images: { 
    sun: 'sun.png',
    ship: 'ship.png',
    tree: 'tree.png',
  },
  stepCount: 3,
  stepSize: 3,
};

describe('planGame', () => {
  it('returns game levels', () => {
    expect(new Set(planGame(options).map(l => l.target))).toEqual(new Set(['ship', 'tree', 'sun']));
  });
  it('has matching images', () => {
    for (const { target, image } of planGame(options)) {
      expect(image).toBe(options.images[target]);
    }
  });
  it('gives proper filler count', () => {
    for (const { getFillers } of planGame(options)) {
      expect(getFillers().length).toBe(options.stepSize - 1);
    }
  });
  it('does not give duplicate fillers', () => {
    for (const { target, getFillers } of planGame(options)) {
      for (let i = 0; i < 20; i++) {
        const f = getFillers();
        expect(f).not.toContain(target);
        expect(f).toHaveLength(new Set(f).size);
      }
    }
  });
});

describe('game', () => {
  it('returns game', () => {
    expect(get(game(options))).toMatchObject({ totalSteps: 3, remainingSteps: 3 });
  });
  it('next("success") removes word from queue', () => {
    const s = game(options);
    const target = get(s).step?.target;
    s.next('success');
    expect(get(s).remainingSteps).toBe(2);
    expect(get(s).step?.target).not.toBe(target);
    s.next('success');
    expect(get(s).step?.target).not.toBe(target);
    s.next('success');
    expect(get(s).step).toBe(null);
    expect(get(s).remainingSteps).toBe(0);
  });
  it('next("error") preserves remaining', () => {
    const s = game(options);
    const target = get(s).step?.target;
    s.next('error');
    expect(get(s).remainingSteps).toBe(3);
    const queue = [];
    for (let i = 0; i < 3; i++) {
      queue.push(get(s).step?.target);
      s.next('success');
    }
    expect(queue).toContain(target);
  });
});
