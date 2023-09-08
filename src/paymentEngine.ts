import { isSameDay } from 'date-fns';
import { readable, writable, type Readable, get, derived } from "svelte/store";

interface Storage {
  games: number[];
  didPay?: boolean;
}
interface Actions {
  endGame(): void;
  pay(): void;
}
interface State {
  canPlay: boolean;
}
export const key = 'hughlaurie:pay';

export function getState(storage: Storage): State {
  return {
    canPlay: storage.didPay || storage.games.filter(d => isSameDay(d, Date.now())).length < 2
  };
}

export function getPaymentEngine(): Readable<State> & Actions {
  if (!globalThis.localStorage) {
    return {
      ...readable({ canPlay: true }),
      endGame: () => null,
      pay: () => null,
    };
  }
  const rawData = safeParse(localStorage.getItem(key), {});
  const store = writable<Storage>({ 
    games: Array.isArray(rawData.games) ? rawData.games.filter((ts: any) => typeof ts === 'number') : [],
    didPay: rawData.didPay,
  });
  const persist = () => localStorage.setItem(key, JSON.stringify(get(store)));
  return {
    ...derived(store, getState),
    endGame: () => {
      store.update(s => ({ ...s, games: s.games.concat(Date.now()) }));
      persist();
    },
    pay: () => {
      store.update(s => ({ ...s, didPay: true }));
      persist();
    }
  }
}

const safeParse = (maybeJson: string | null, fallback: any) => {
  try {
    return JSON.parse(maybeJson ?? '') || fallback;
  } catch (err) {
    return fallback;
  }
}