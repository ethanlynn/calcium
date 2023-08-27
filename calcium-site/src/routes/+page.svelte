<header class="container">
  <div class="element">Ca</div>
  <div>
    <h1>Calcium</h1>
    <p class="subtitle">A browser extension for devs</p>
  </div>
  <a class="github-link" href="https://github.com/ethanlynn/calcium">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 250 250"
      fill="var(--gray-100)"
      style="position: absolute; top: 0; right: 0"
    >
      <path d="M0 0l115 115h15l12 27 108 108V0z" fill="var(--gray-800)" />
      <path
        d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16"
      />
      <path
        d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"
      />
    </svg>
  </a>
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
  <img alt="Calcium Demo" src="demo.gif" class="demo" />
</div>

<style>
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
