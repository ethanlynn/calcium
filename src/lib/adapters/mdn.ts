import MiniSearch from "minisearch";
import { Adapter, type SearchResult } from "./base";

const mdnUrl = "https://developer.mozilla.org/";

export class MDNAdapter extends Adapter {
  searchIndex: MiniSearch<{ title: string; url: string }>;

  constructor() {
    super();
    this.tag = "mdn";
    this.url = mdnUrl;
    this.searchIndex = new MiniSearch({
      fields: ["title", "url"],
      storeFields: ["title", "url"],
    });
  }

  async init() {
    const response = await fetch(`${mdnUrl}en-US/search-index.json`);
    const pages = (await response.json()) as { title: string; url: string }[];
    console.log(pages);
    this.searchIndex.addAll(
      pages.map(({ title, url }) => ({ id: url, title, url })).slice(0, 1000),
    );
  }

  async search(pattern: string): Promise<SearchResult[]> {
    return this.searchIndex.search(pattern).map((result) => ({
      title: result.title,
      url: result.url,
      acceptAction: {
        type: "link",
        href: result.url,
      },
    }));
  }
}
