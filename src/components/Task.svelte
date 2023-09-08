<script lang="ts">
  import shuffle from 'array-shuffle';
  import Option from './Option.svelte';

  export let image: string;
  export let target: string;
  export let fillers: string[] = [];
  export let onCorrect: () => void;
  export let onError: () => void;
  
  const size = 160;
  $: wordList = shuffle([target, ...fillers].slice(0, 4));
</script>

<img src={image} height={size} width={size} alt="">
<div class="answers">
  {#each wordList as word}
    <Option correct={word === target} onClick={word === target ? onCorrect : onError}>{word}</Option>
  {/each}
</div>

<style>
  img {
    height: auto;
    height: 160px;
    border-radius: 14px;
  }

  .answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 80px 80px;
    width: 100%;
    gap: 16px;
  }
</style>