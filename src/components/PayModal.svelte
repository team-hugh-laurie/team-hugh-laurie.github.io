<script lang="ts">
  import { fly } from 'svelte/transition';
  import Button from './Button.svelte';
  
  export let locale: 'ru' | 'intl';
  export let restart: () => void;

  const links = {
    ru: 'https://boosty.to/english-duck/donate',
    intl: 'https://buymeacoffee.com/thoughtspile',
  };
  
  $: texts = locale === 'ru' ? {
    title: 'Спасибо',
    body: 'Нам приятно, что ты оценил нашу работу! Играй и учись сколько хочешь — совершенно бесплатно.',
    pay: 'Поддержи нашу команду донатом',
    playAgain: 'Играть дальше'
  } : {
    title: 'Thanks',
    body: `Glad you're enjoying our app! Play and learn — free of charge.`,
    pay: 'Donate to support our team',
    playAgain: 'Play again',
  };
</script>

<dialog open transition:fly>
  <h1>{texts.title} &#128151;</h1>

  <p>{texts.body}</p>
  <a target="_blank" href={links[locale]}>{texts.pay}</a>

  <Button on:click={restart}>{texts.playAgain}</Button>
</dialog>

<style>
  dialog {
    border: none;
    max-width: 300px;
    border-radius: 14px;
    box-shadow: 0 0 0 1000px rgba(0,0,0,0.6);
  }

  h1, p, a {
    font-weight: 500;
    text-align: center;
  }

  a {
    display: block;
    margin-bottom: 20px;
    color: var(--purple);
  }

  h1 {
    font-size: 32px;
    margin: 0;
  }
</style>