<script lang="ts">
  import { onMount } from "svelte";
  import {
    type Adapter,
    type SearchResult,
    BrowserAdapter,
    CanIUseAdapter,
    MDNAdapter,
    NPMAdapter,
  } from "./lib/adapters";

  const adapters: Record<string, { adapter: Adapter; initialized: boolean }> = {
    default: { adapter: new BrowserAdapter(), initialized: false },
    mdn: { adapter: new MDNAdapter(), initialized: false },
    caniuse: { adapter: new CanIUseAdapter(), initialized: false },
    npm: { adapter: new NPMAdapter(), initialized: false },
  };

  let searchInput: HTMLInputElement;
  let searchInputValue = "";
  let searchInputHighlighted = "";

  let selectedSearchResult = 0;

  const escape = (html: string) =>
    html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  let searchResults: SearchResult[] = [];

  $: {
    const match = searchInputValue.match(/^@([a-z]+)(.*)$/);
    const adapterId =
      match !== null && Object.hasOwn(adapters, match[1])
        ? match[1]
        : "default";
    const pattern = match !== null ? match[2] : searchInputValue;
    if (adapterId !== "default") {
      searchInputHighlighted = `<span class="primary">@${adapterId}</span>${escape(
        pattern,
      )}`;
    } else {
      searchInputHighlighted = escape(searchInputValue);
    }
    const { adapter, initialized } = adapters[adapterId];

    // TODO: Correctly time/sequence this async result.
    (async () => {
      if (!initialized) {
        await adapter.init();
        adapters[adapterId].initialized = true;
      }
      searchResults = await adapter.search({
        pattern: pattern.trim(),
        limit: 5,
      });
    })();
  }

  $: {
    if (
      searchResults === undefined ||
      selectedSearchResult >= searchResults.length
    ) {
      selectedSearchResult = 0;
    }
  }

  const acceptSearchResult = async (i: number) => {
    const acceptAction = searchResults[i].acceptAction;
    switch (acceptAction.type) {
      case "tab":
        chrome.tabs.update(acceptAction.tabId, { selected: true });
        window.close();
        break;
      case "link":
        chrome.tabs.create({ url: acceptAction.href });
        break;
      case "copy":
        break;
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        selectedSearchResult = Math.max(selectedSearchResult - 1, 0);
        event.preventDefault();
        return false;
      case "ArrowDown":
        selectedSearchResult = Math.min(
          selectedSearchResult + 1,
          searchResults.length - 1,
        );
        event.preventDefault();
        return false;
      case "Enter":
        acceptSearchResult(selectedSearchResult);
      default:
        return true;
    }
  };

  onMount(async () => {
    searchInput.focus();
  });
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="popup">
  <label class="search">
    <div class="search-input-highlighted">{@html searchInputHighlighted}</div>
    <input
      bind:this={searchInput}
      bind:value={searchInputValue}
      type="text"
      class="search-input"
    />
  </label>
  <div class="search-results">
    {#each searchResults as { title, url, iconUrl, preview }, i}
      <button
        class="search-result"
        class:selected={i === selectedSearchResult}
        on:click={() => acceptSearchResult(i)}
      >
        <header class="search-result-header">
          {#if iconUrl}
            <img width="16px" height="16px" alt={title} src={iconUrl} />
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="var(--gray-400)"
              style:width="20px"
              style:height="20px"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-11-4.69v.447a3.5 3.5 0 001.025 2.475L8.293 10 8 10.293a1 1 0 000 1.414l1.06 1.06a1.5 1.5 0 01.44 1.061v.363a1 1 0 00.553.894l.276.139a1 1 0 001.342-.448l1.454-2.908a1.5 1.5 0 00-.281-1.731l-.772-.772a1 1 0 00-1.023-.242l-.384.128a.5.5 0 01-.606-.25l-.296-.592a.481.481 0 01.646-.646l.262.131a1 1 0 00.447.106h.188a1 1 0 00.949-1.316l-.068-.204a.5.5 0 01.149-.538l1.44-1.234A6.492 6.492 0 0116.5 10z"
                clip-rule="evenodd"
              />
            </svg>
          {/if}
          <h2 class="search-result-title">
            {title}
          </h2>
          <svg
            style:width="20px"
            style:height="20px"
            fill={i === selectedSearchResult
              ? "var(--blue-500)"
              : "var(--gray-400)"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </header>
        <span class="search-result-url">{url}</span>
        {#if preview !== undefined}
          <span class="search-result-preview">{preview}</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .popup {
    background: var(--gray-800);
    width: 640px;
    height: 480px;
    display: flex;
    flex-direction: column;
  }

  .search {
    display: block;
    position: relative;
    background: var(--gray-100);
    padding: 12px;
  }

  .search-input-highlighted {
    display: block;
    color: var(--gray-800);
    font-size: 18px;
    line-height: 32px;
    height: 32px;
    font-family: inherit;
    white-space: pre;
  }

  .search-input-highlighted :global(.primary) {
    color: var(--blue-500);
  }

  .search-input-highlighted :global(.secondary) {
    color: var(--pink-400);
  }

  .search-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 12px;
    appearance: none;
    background: transparent;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 18px;
    line-height: 32px;
    color: transparent;
    caret-color: var(--gray-800);
  }

  .search-input:focus {
    outline: none;
  }

  .search-results {
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
    padding: 8px;
    gap: 8px;
    overflow-y: auto;
  }

  .search-results::after {
    content: "";
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    z-index: 10;
    background: linear-gradient(to bottom, transparent, var(--gray-800));
  }

  .search-result {
    all: unset;
    display: flex;
    flex-direction: column;
    background: var(--gray-700);
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    border: 2px solid transparent;
  }

  .search-result-header {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .search-result.selected {
    border-color: var(--blue-500);
  }

  .search-result-title {
    flex: 1;
    font-size: 14px;
    line-height: 20px;
    color: var(--gray-200);
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .search-result-url {
    flex: 1;
    font-size: 14px;
    line-height: 20px;
    color: var(--gray-400);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .search-result-preview {
    color: var(--gray-400);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 20px;
    height: 0;
  }

  .search-result.selected .search-result-preview {
    height: 60px;
  }
</style>
