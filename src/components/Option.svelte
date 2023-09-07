<script lang="ts">
  export let onClick: () => void;
</script>

<button on:click={onClick}><slot /></button>

<style>
  button {
    background: var(--bg);
    color: var(--text);
    border: none;
    cursor: pointer;
    font-size: 24px;
    border-radius: 14px;
  }
  button:active {
    background: var(--gray);
  }
  @media (hover: hover) {
    button:hover {
      background: var(--gray);
    }
  }
</style>