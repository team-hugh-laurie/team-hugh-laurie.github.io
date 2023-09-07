<script lang="ts">
  import { game, type GameOptions } from '../game';
  import Task from './Task.svelte';
  import Progress from './Progress.svelte';
  import Success from './Success.svelte';
  import { plausible } from '../plausible';
  
  export let options: GameOptions;
  
  let state = game(options);
  function restart() {
    state = game(options);
    plausible('again');
  }
  function onCorrect() {
    state.next('success')
    plausible('correct');
  }
  function onError() {
    state.next('error')
    plausible('error');
  }
  $: !$state.step && plausible('win');
</script>

<section>
  {#if $state.step}
    <Progress done={$state.totalSteps - $state.remainingSteps} total={$state.totalSteps} />
    <Task {...$state.step} {onCorrect} {onError} />
  {:else}
    <Success {restart} />
  {/if}
</section>

<style>
  section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    align-self: center;
    box-sizing: border-box;
    max-width: 420px;
    width: 100%;
    min-width: 300px;
    max-height: 600px;
  }
</style>