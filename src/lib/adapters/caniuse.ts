import MiniSearch from "minisearch";
import { Adapter, type SearchResult, type SearchOptions } from "./base";

type Browser =
  | "ie"
  | "edge"
  | "firefox"
  | "chrome"
  | "safari"
  | "opera"
  | "ios_saf"
  | "op_mini"
  | "android"
  | "bb"
  | "op_mob"
  | "and_chr"
  | "and_ff"
  | "ie_mob"
  | "and_uc"
  | "samsung"
  | "and_qq"
  | "baidu"
  | "kaios";

type CanIUseFeature = {
  title: string;
  description: string;
  spec: string;
  status: "wd" | string;
  links: { url: string; title: string }[];
  bugs: { description: string }[];
  categories: string[];
  stats: {
    [browser: string]: {
      [version: string]: "u" | "y" | "n";
    };
  };
  notes: string;
  notes_by_num: {
    [number: number]: string;
  };
  usage_perc_y: number;
  usage_perc_a: number;
  ucprefix: boolean;
  parent: string;
  keywords: string;
  shown: boolean;
  ie_id: string;
  chrome_id: string;
  firefox_id: string;
  webkit_id: string;
};

type CanIUseData = {
  data: {
    [feature: string]: CanIUseFeature;
  };
};

type CanIUseSearchItem = {
  id: string;
  title: string;
  description: string;
};

type CanIUseAdapterOptions = {
  cacheDuration?: number;
};

const canIUseUrl = "https://caniuse.com";

const miniSearchOptions = {
  fields: ["title"],
  storeFields: ["title"],
  searchOptions: {
    boost: { title: 2 },
    prefix: true,
    fuzzy: 0.2,
  },
};

export class CanIUseAdapter extends Adapter {
  cacheDuration: number;
  searchIndex: MiniSearch<CanIUseSearchItem>;

  constructor({
    cacheDuration = 1000 * 60 * 60 * 24,
  }: CanIUseAdapterOptions = {}) {
    super();
    this.cacheDuration = cacheDuration;
  }

  async init() {
    const {
      adapters_caniuse_expiresAt: expiresAt,
      adapters_caniuse_data: data,
    } = (await chrome.storage.local.get({
      adapters_caniuse_expiresAt: undefined,
      adapters_caniuse_data: undefined,
    })) as {
      adapters_caniuse_expiresAt?: string;
      adapters_caniuse_data?: string;
    };
    if (data && expiresAt !== undefined && Date.parse(expiresAt) > Date.now()) {
      this.searchIndex = MiniSearch.loadJSON(data, miniSearchOptions);
    } else {
      const response = await fetch(
        "https://raw.githubusercontent.com/Fyrd/caniuse/main/data.json",
      );
      const data = (await response.json()) as CanIUseData;
      const items = Object.entries(data.data).map(
        ([featureId, { title, description }]) => ({
          id: featureId,
          title,
          description,
        }),
      );
      this.searchIndex = new MiniSearch(miniSearchOptions);
      this.searchIndex.addAll(items);
      await chrome.storage.local.set({
        adapters_caniuse_expiresAt: Date.now() + this.cacheDuration,
        adapters_caniuse_data: JSON.stringify(this.searchIndex),
      });
    }
  }

  async search({ pattern, limit }: SearchOptions): Promise<SearchResult[]> {
    return this.searchIndex
      .search(pattern)
      .slice(0, limit)
      .map((item) => {
        const url = `${canIUseUrl}/${item.id}`;
        return {
          iconUrl: `${canIUseUrl}/img/favicon-128.png`,
          title: item.title,
          url,
          acceptAction: {
            type: "link",
            href: url,
          },
        };
      });
  }
}
