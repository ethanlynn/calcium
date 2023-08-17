import MiniSearch from "minisearch";
import SearchAdapter, { type SearchResult } from "./base";

class MDNSearchAdapter extends SearchAdapter {
  searchIndex: MiniSearch<SearchResult>;

  constructor() {
    super();
    this.searchIndex = new MiniSearch({
      fields: ["title", "url"],
      storeFields: ["title", "url"],
    });
  }

  async initialize() {
    const response = await fetch(
      "https://developer.mozilla.org/en-US/search-index.json",
    );
    const pages = await response.json();
    this.searchIndex.addAll(pages);
  }

  search(pattern: string): SearchResult[] {
    return this.searchIndex.search(pattern).map((result) => ({
      icon: "https://developermozz",
      title: result.title,
      url: result.url,
      preview: undefined,
    }));
  }
}
