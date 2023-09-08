<script lang="ts">
  export let restart: () => void;
</script>

<svg class="bg-rays" width="375" height="416" viewBox="0 0 375 416" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M375 0H0V89.4467L188 416L375 89.4467V0Z" fill="#5A33C6"/>
  <path d="M375 0H0L188 326.5L375 0Z" fill="#5331B3"/>
</svg>

<h1>Well done!</h1>

<svg class="duck" xmlns="http://www.w3.org/2000/svg" width="375" height="416">
  <use href="#winnerduck" />
</svg>

<button on:click={restart}>Play again</button>

<style>
  h1, button {
    color: var(--bg);
    font-weight: 500;
  }

  h1 {
    font-size: 32px;
    margin: 0;
  }
  
  button {
    width: 100%;
    padding: 10px;
    border-radius: 100px;
    font-size: 24px;
    border: none;
    background: var(--accent);
    letter-spacing: 0.2px;
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
    z-index: -2;
  }
</style>