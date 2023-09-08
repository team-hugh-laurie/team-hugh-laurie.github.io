<script lang="ts">
  import Button from './Button.svelte';

  export let restart: () => void;
  export let onMicrotransaction: () => void;
  export let onSubscription: () => void;
  export let isPaywall: boolean;

  const onRetry = isPaywall ? (() => showPaywall = true) : restart;
  
  let showPaywall = false;
  const title = showPaywall ? 'О нет! На сегодня уровни закончились' : 'Молодец!';
</script>

<svg class="bg-rays" width="375" height="416" viewBox="0 0 375 416" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M375 0H0V89.4467L188 416L375 89.4467V0Z" fill="#5A33C6"/>
  <path d="M375 0H0L188 326.5L375 0Z" fill="#5331B3"/>
</svg>

<h1>{title}</h1>

{#if showPaywall}
  <svg xmlns="http://www.w3.org/2000/svg" width="206" height="294" viewBox="0 0 206 294">
    <use href="#doneduck" />
  </svg>
  <div class="actions">
    <p>Возвращайся завтра или оплати подписку, чтобы не ждать:</p>
    <Button on:click={onMicrotransaction}>24 часа за 10&#8202;₽</Button>
    <Button on:click={onSubscription}>Навсегда за 100&#8202;₽</Button>
  </div>
{:else}
  <svg class="duck" xmlns="http://www.w3.org/2000/svg" width="375" height="416">
    <use href="#winnerduck" />
  </svg>
  <Button on:click={onRetry}>Играть</Button>
{/if}

<style>
  h1, p {
    color: var(--bg);
    font-weight: 500;
    text-align: center;
  }

  h1 {
    font-size: 32px;
    margin: 0;
  }

  p {
    margin: 0;
    max-width: 290px;
  }

  .duck {
    transform-origin: center center;
    animation: 800ms ease jump;
  }

  .bg-rays {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: -2;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
</style>