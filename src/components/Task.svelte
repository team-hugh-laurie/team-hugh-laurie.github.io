<script lang="ts">
  import shuffle from 'array-shuffle';

  export let src: string;
  export let target: string;
  export let altWords: string[] = [];
  export let onCorrect: () => void;
  export let onError: () => void;
  
  const size = 160;
  $: wordList = shuffle([target, ...altWords].slice(0, 4));
</script>

<section>
  <img {src} height={size} width={size} alt="">
  <div class="answers">
    {#each wordList as word}
      <button on:click={word === target ? onCorrect : onError}>{word}</button>
    {/each}
  </div>
</section>


<style>
  section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    border-radius: 1rem;
  }

  .answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    flex-grow: 1;
    width: 100%;
  }
  
  button {
    background: transparent;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 2rem;
  }
  button:hover {
    color: rgba(255,255,255,0.8);
    background: rgba(255,255,255,0.1);
  }
</style>