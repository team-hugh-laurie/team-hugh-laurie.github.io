<script lang="ts">
  export let restart: () => void;
</script>

<h1>Well done!</h1>

<svg xmlns="http://www.w3.org/2000/svg" width="375" height="416">
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
</style>