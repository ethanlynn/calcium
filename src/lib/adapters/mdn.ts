import MiniSearch from "minisearch";
import { Adapter, type SearchResult } from "./base";

const mdnUrl = "https://developer.mozilla.org";

type MDNSearchItem = { title: string; url: string };

export class MDNAdapter extends Adapter {
  searchIndex: MiniSearch<MDNSearchItem>;

  constructor() {
    super();
    this.tag = "mdn";
    this.searchIndex = new MiniSearch({
      fields: ["title", "url"],
      storeFields: ["title", "url"],
      searchOptions: {
        boost: { title: 2 },
        prefix: true,
        fuzzy: 0.2,
      },
    });
  }

  async init() {
    const response = await fetch(`${mdnUrl}/en-US/search-index.json`);
    const pages = (await response.json()) as { title: string; url: string }[];
    this.searchIndex.addAll(
      pages.map(({ title, url }) => ({ id: url, title, url })),
    );
  }

  async search(pattern: string): Promise<SearchResult[]> {
    return this.searchIndex
      .search(pattern)
      .slice(0, 10)
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
