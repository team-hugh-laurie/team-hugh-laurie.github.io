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

<section>
  <img src={image} height={size} width={size} alt="">
  <div class="answers">
    {#each wordList as word}
      <Option onClick={word === target ? onCorrect : onError}>{word}</Option>
    {/each}
  </div>
</section>


<style>
  section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    align-self: center;
    padding: 2rem 1rem;
    box-sizing: border-box;
    max-width: 420px;
    width: 100%;
    min-width: 300px;
    max-height: 600px;
  }

  img {
    height: auto;
    max-width: 100%;
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