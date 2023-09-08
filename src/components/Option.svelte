<script lang="ts">
  export let onClick: () => void;
  export let correct: boolean;

  let selected = false;
  function clickHandler() {
    selected = true;
    onClick();
  }
</script>

<button on:click={clickHandler} class:correct class:selected><slot /></button>

<style>
  button {
    background: var(--bg);
    color: var(--text);
    border: none;
    cursor: pointer;
    font-size: 24px;
    border-radius: 14px;
  }
  button.selected {
    color: var(--bg);
  }
  button.selected.correct {
    background: var(--positive);
  }
  button.selected:not(.correct) {
    background: var(--negative);
  }
  @media (hover: hover) {
    button:hover {
      background: var(--gray);
    }
  }
</style>