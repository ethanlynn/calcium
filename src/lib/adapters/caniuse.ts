import MiniSearch from "minisearch";
import { Adapter, type SearchResult } from "./base";

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

const canIUseUrl = "https://caniuse.com";

export class CanIUseAdapter extends Adapter {
  searchIndex: MiniSearch<CanIUseSearchItem>;

  constructor() {
    super();
    this.tag = "caniuse";
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
    const response = await fetch(
      "https://raw.githubusercontent.com/Fyrd/caniuse/main/data.json",
    );
    const data = (await response.json()) as CanIUseData;
    const searchItems = Object.entries(data.data).map(
      ([featureId, { title, description }]) => ({
        id: featureId,
        title,
        description,
      }),
    );
    this.searchIndex.addAll(searchItems);
  }

  async search(pattern: string): Promise<SearchResult[]> {
    return this.searchIndex
      .search(pattern)
      .slice(0, 10)
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
