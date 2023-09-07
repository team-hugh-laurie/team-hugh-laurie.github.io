<script lang="ts">
  import { game, type GameOptions } from '../game';
  import Task from './Task.svelte';
  import Progress from './Progress.svelte';
  
  export let options: GameOptions;
  
  const state = game(options);
  $: progress = 1 - $state.remainingSteps / $state.totalSteps;
  $: console.log(progress, $state)
</script>

<section>
  {#if $state.step}
    <Progress done={$state.totalSteps - $state.remainingSteps} total={$state.totalSteps} />
    <Task
      {...$state.step}
      onCorrect={() => state.next('success')}
      onError={() => state.next('error')}
    />
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