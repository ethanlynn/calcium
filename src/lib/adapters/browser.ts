import MiniSearch from "minisearch";
import { Adapter, type SearchOptions, type SearchResult } from "./base";

type SearchItem = {
  id: number;
  url: string;
  title: string;
  iconUrl: string;
  text: string;
};

export class BrowserAdapter extends Adapter {
  searchIndex: MiniSearch<SearchItem>;

  async init() {
    this.searchIndex = new MiniSearch({
      fields: ["url", "title", "text"],
      storeFields: ["id", "url", "title", "text", "iconUrl"],
      searchOptions: {
        boost: { title: 2 },
        prefix: true,
        fuzzy: 0.2,
      },
    });
    const tabs = await chrome.tabs.query({
      url: ["http://*/*", "https://*/*"],
    });
    const searchItems = await Promise.all(
      tabs.map(async (tab) => {
        try {
          const text = await chrome.tabs.sendMessage(tab.id, {
            type: "GET_TEXT",
          });
          return {
            id: tab.id,
            url: tab.url,
            title: tab.title,
            iconUrl: tab.favIconUrl,
            text,
          };
        } catch {
          return undefined;
        }
      }),
    );
    this.searchIndex.addAll(searchItems.filter((item) => item !== undefined));
  }

  async search({ pattern, limit }: SearchOptions): Promise<SearchResult[]> {
    return this.searchIndex
      .search(pattern)
      .slice(0, limit)
      .map((item) => ({
        url: item.url,
        title: item.title,
        iconUrl: item.iconUrl,
        preview: item.text,
        acceptAction: { type: "tab", tabId: item.id },
      }));
  }
}
