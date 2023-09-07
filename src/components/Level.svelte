<script lang="ts">
  import { game, type GameOptions } from '../game';
  import Task from './Task.svelte';
  
  export let options: GameOptions;
  
  const state = game(options);
</script>

{#if $state.step}
  <Task
    {...$state.step}
    onCorrect={() => state.next('success')}
    onError={() => state.next('error')}
  />
{/if}
