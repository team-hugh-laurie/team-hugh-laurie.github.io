<script lang="ts">
  import { fly } from 'svelte/transition';
  import Button from './Button.svelte';

  export let restart: () => void;
</script>

<dialog open transition:fly>
  <h1>Спасибо &#128151;</h1>

  <p>Нам приятно, что ты оценил нашу работу! Играй и учись сколько хочешь — совершенно бесплатно.</p>

  <Button on:click={restart}>Играть дальше</Button>
</dialog>

<style>
  dialog {
    border: none;
    max-width: 300px;
    border-radius: 14px;
    box-shadow: 0 0 0 1000px rgba(0,0,0,0.6);
  }

  h1, p {
    font-weight: 500;
    text-align: center;
  }

  h1 {
    font-size: 32px;
    margin: 0;
  }
</style>