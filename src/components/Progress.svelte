<script lang="ts">
  export let total: number;
  export let done: number;
</script>

<div class="container">
  <div>{done} / {total}</div>
  <progress value={done / total} />
  <svg xmlns="http://www.w3.org/2000/svg" width="85" height="113">
    <use href="#miniduck" />
  </svg>
</div>

<style>
  .container {
    width: 100%;
    position: relative;
    margin-top: 60px;
  }

  div {
    color: var(--bg);
    font-size: 20px;
    margin-bottom: 10px;
  }

  svg {
    position: absolute;
    bottom: 8px;
    right: 0;
    z-index: -1;
    transform: scale(0.8);
    transform-origin: bottom right;
  }

  progress {
    width: 100%;
    height: 16px;
    appearance: none;
  }
  
  progress::-webkit-progress-bar {
    background: rgba(67, 35, 156, 1);
    border-radius: 100px;
  }
  
  progress::-webkit-progress-value {
    background: rgba(252, 151, 4, 1);
    border-radius: 100px;
    transition: all 300ms ease;
  }
</style>