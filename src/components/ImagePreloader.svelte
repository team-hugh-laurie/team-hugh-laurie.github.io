<script lang="ts">
  export let images: string[];
</script>

{#each images as href}
  <link rel="preload" as="image" {href}>
{/each}