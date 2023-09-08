<script lang="ts">
  import { game, type GameOptions } from '../game';
  import Task from './Task.svelte';
  import Progress from './Progress.svelte';
  import Success from './Success.svelte';
  import ImagePreloader from './ImagePreloader.svelte';
  import { plausible } from '../plausible';
  import { fadeOut, screenSlide } from './transitions';
  
  export let options: GameOptions;
  
  let state = game(options);
  $: !$state.step && plausible('win');
  
  const successActions = {
    restart: () => {
      state = game(options);
      plausible('again');
    },
    onMicrotransaction: () => {
      successActions.restart();
      plausible('microtransaction');
    },
    onSubscription: () => {
      successActions.restart();
      plausible('subscription');
    }
  };
  
  const taskActions = {
    onCorrect: () => {
      state.next('success')
      plausible('correct');
    },
    onError: () => {
      state.next('error')
      plausible('error');
    }
  };
</script>

<section>
  {#if $state.step}
    <Progress done={$state.totalSteps - $state.remainingSteps} total={$state.totalSteps} />
    {#key $state.attempt}
      <div class="slider" in:screenSlide out:fadeOut>
        <Task {...$state.step} {...taskActions} />
      </div>
    {/key}
  {:else}
    <Success isPaywall={false} {...successActions} />
  {/if}
  <ImagePreloader images={$state.images} />
</section>

<style>
  section, .slider {
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    width: 100%;
  }
  section {
    align-self: center;
    box-sizing: border-box;
    max-width: 420px;
    min-width: 300px;
    max-height: 600px;
  }
</style>