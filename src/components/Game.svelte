<script>
  import { loadGameData } from '../api';
  import Level from './Level.svelte';
</script>

{#await loadGameData() then data}
  <Level options={{...data, stepCount: 6, stepSize: 4}} />
{/await}