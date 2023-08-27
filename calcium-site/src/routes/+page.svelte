<header class="container">
  <div class="element">Ca</div>
  <div>
    <h1>Calcium</h1>
    <p class="subtitle">A browser extension for devs</p>
  </div>
</header>
<div class="container">
  <ul class="highlights">
    <li>
      <span class="emoji">🔎</span> Fuzzy-find on browser tabs, bookmarks, history
    </li>
    <li>
      <span class="emoji">🏃</span> Search and jump to common developer docs
    </li>
    <li>
      <span class="emoji">❤️</span> Integrate with your favorite platforms
    </li>
  </ul>
  <img src="demo.gif" class="demo" />
</div>

<style>
  :global(:root) {
    background: var(--gray-100);
    color: var(--gray-800);
  }

  .container {
    max-width: 704px;
    padding: 32px;
    margin: 0 auto;
  }

  header {
    display: flex;
    gap: 32px;
    align-items: center;
  }

  .element {
    display: flex;
    width: 128px;
    height: 128px;
    align-items: center;
    justify-content: center;
    font-size: 64px;
    font-weight: bold;
    padding: 0 8px;
    border-radius: 8px;
    background: linear-gradient(to bottom, var(--blue-500), var(--blue-600));
    box-shadow: -8px 8px 64px 0 var(--blue-300);
    text-shadow: 0 0 8px var(--blue-400);
    color: var(--gray-100);
  }

  h1 {
    font-size: 64px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 16px;
    line-height: 1;
  }

  .subtitle {
    color: var(--gray-500);
    font-size: 32px;
    margin: 0;
    line-height: 1;
  }

  .highlights {
    list-style: none;
    font-size: 20px;
    color: var(--gray-800);
    margin: 0;
    margin-bottom: 48px;
    padding: 0;
  }

  .highlights > li {
    margin-bottom: 16px;
  }

  .emoji {
    margin-right: 8px;
  }

  .demo {
    display: block;
    width: 100%;
    box-shadow: -4px 4px 16px 0 var(--gray-400);
  }
</style>
