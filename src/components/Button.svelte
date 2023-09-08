<button on:click {...$$props}><slot /></button>

<style>
  button {
    width: 100%;
    padding: 10px;
    border-radius: 100px;
    font-size: 20px;
    border: none;
    background: var(--accent);
    letter-spacing: 0.2px;
    color: var(--bg);
    font-weight: 500;
    text-align: center;
  }
</style>
