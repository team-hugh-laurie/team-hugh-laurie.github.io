/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from 'vitest';
import { getPaymentEngine, getState, key } from './paymentEngine';
import { get } from 'svelte/store';

vi.useFakeTimers();

describe('getState', () => {
  it('can play first game', () => {
    expect(getState({ games: [] })).toEqual({ canPlay: true });
  });
  it('can play second game', () => {
    expect(getState({ games: [Date.now()] })).toEqual({ canPlay: true });
  });
  it('cant play >2 games in 1 day', () => {
    expect(getState({ games: [Date.now(), Date.now()] })).toEqual({ canPlay: false });
    expect(getState({ games: [Date.now(), Date.now(), Date.now()] })).toEqual({ canPlay: false });
  });
  it('can play >2 games in 1 day if didPay', () => {
    expect(getState({ games: [Date.now(), Date.now()], didPay: true })).toEqual({ canPlay: true });
  });
});

describe('paymentEngine', () => {
  afterEach(() => localStorage.clear());
  it('can play without LS record', () => {
    expect(get(getPaymentEngine())).toEqual({ canPlay: true });
  });
  it('records game', () => {
    const s = getPaymentEngine();
    s.endGame();
    expect(get(s)).toEqual({ canPlay: true });
    expect(JSON.parse(localStorage.getItem(key) ?? '')).toEqual({ games: [Date.now()] });
  });
  it('records 2 games, disables play', () => {
    const s = getPaymentEngine();
    s.endGame();
    s.endGame();
    expect(get(s)).toEqual({ canPlay: false });
    expect(JSON.parse(localStorage.getItem(key) ?? '')).toEqual({ games: [Date.now(), Date.now()] });
  });
  it('can pay', () => {
    const s = getPaymentEngine();
    s.endGame();
    s.endGame();
    s.pay();
    expect(get(s)).toEqual({ canPlay: true });
    expect(JSON.parse(localStorage.getItem(key) ?? '')).toMatchObject({ didPay: true });
  });
  it('reads localStorage', () => {
    localStorage.setItem(key, JSON.stringify({ games: [Date.now(), Date.now(), Date.now()] }));
    expect(get(getPaymentEngine())).toEqual({ canPlay: false });
    localStorage.setItem(key, JSON.stringify({ games: [Date.now(), Date.now(), Date.now()], didPay: true }));
    expect(get(getPaymentEngine())).toEqual({ canPlay: true });
  });
  it('allows corrupt localStorage', () => {
    localStorage.setItem(key, JSON.stringify({ games: 'dick' }));
    expect(get(getPaymentEngine())).toEqual({ canPlay: true });
    localStorage.setItem(key, 'bad');
    expect(get(getPaymentEngine())).toEqual({ canPlay: true });
    localStorage.setItem(key, JSON.stringify({ games: ['dick'] }));
    expect(get(getPaymentEngine())).toEqual({ canPlay: true });
  });
})