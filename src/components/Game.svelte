<script>
  import { loadGameData } from '../api';
  import Level from './Level.svelte';
  import Loader from './Loader.svelte';
</script>

{#await loadGameData()}
  <Loader />
{:then data}
  <Level options={{...data, stepCount: 6, stepSize: 4}} />
{/await}