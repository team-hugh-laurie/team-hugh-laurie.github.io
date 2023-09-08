<script lang="ts">
  import { game, type GameOptions } from '../game';
  import Task from './Task.svelte';
  import Progress from './Progress.svelte';
  import Success from './Success.svelte';
  import ImagePreloader from './ImagePreloader.svelte';
  import { plausible } from '../plausible';
  import { fadeOut, screenSlide } from './transitions';
  import { getPaymentEngine } from '../paymentEngine';
  import PayModal from './PayModal.svelte';
  
  export let options: GameOptions;
  
  let showPayModal = false;
  const payEngine = getPaymentEngine();
  let state = game(options);
  // on game end
  $: if (!$state.step) {
    plausible('win');
  }
  
  function restart() {
    payEngine.endGame();
    showPayModal = false;
    state = game(options);
    plausible('again');
  }

  const successActions = {
    restart,
    onMicrotransaction: () => {
      payEngine.pay();
      showPayModal = true;
      plausible('microtransaction');
    },
    onSubscription: () => {
      payEngine.pay();
      showPayModal = true;
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
  {#if !$payEngine.canPlay || showPayModal}
    <Success isPaywall {...successActions} />
  {:else if $state.step}
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

{#if showPayModal}
  <PayModal {restart} />
{/if}

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