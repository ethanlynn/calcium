import MiniSearch from "minisearch";
import { Adapter, type SearchOptions, type SearchResult } from "./base";

type MDNSearchItem = {
  id: string;
  title: string;
  url: string;
};

type MDNAdapterOptions = {
  cacheDuration?: number;
};

const mdnUrl = "https://developer.mozilla.org";

const miniSearchOptions = {
  fields: ["title", "url"],
  storeFields: ["title", "url"],
  searchOptions: {
    boost: { title: 2 },
    prefix: true,
    fuzzy: 0.2,
  },
};

export class MDNAdapter extends Adapter {
  cacheDuration: number;
  searchIndex: MiniSearch<MDNSearchItem>;

  constructor({ cacheDuration = 1000 * 60 * 60 * 24 }: MDNAdapterOptions = {}) {
    super();
    this.cacheDuration = cacheDuration;
  }

  async init() {
    const { adapters_mdn_data: data, adapters_mdn_expiresAt: expiresAt } =
      (await chrome.storage.local.get(
        ["adapters_mdn_data", "adapters_mdn_expiresAt"]
      )) as {
        adapters_mdn_data?: string;
        adapters_mdn_expiresAt?: number;
      };
    if (
      data !== undefined &&
      expiresAt !== undefined &&
      expiresAt > Date.now()
    ) {
      this.searchIndex = MiniSearch.loadJSON(data, miniSearchOptions);
    } else {
      const response = await fetch(`${mdnUrl}/en-US/search-index.json`);
      const pages: MDNSearchItem[] = await response.json();
      this.searchIndex = new MiniSearch(miniSearchOptions);
      this.searchIndex.addAll(
        pages.map(({ title, url }) => ({ id: url, title, url })),
      );
      await chrome.storage.local.set({
        adapters_mdn_data: JSON.stringify(this.searchIndex),
        adapters_mdn_expiresAt: Date.now() + this.cacheDuration,
      });
    }
  }

  async search({ pattern, limit }: SearchOptions): Promise<SearchResult[]> {
    return this.searchIndex
      .search(pattern)
      .slice(0, limit)
      .map((item) => ({
        iconUrl: `${mdnUrl}/favicon.ico`,
        title: item.title,
        url: item.url,
        acceptAction: {
          type: "link",
          href: `${mdnUrl}${item.url}`,
        },
      }));
  }
}
