export type AcceptAction =
  | { type: "tab"; tabId: number }
  | { type: "link"; href: string }
  | { type: "copy"; data: string };

export type SearchResult = {
  title: string;
  iconUrl?: string;
  url?: string;
  preview?: string;
  acceptAction: AcceptAction;
};

export type SearchOptions = {
  pattern: string;
  limit?: number;
};

export abstract class Adapter {
  abstract init(): Promise<void>;

  abstract search(options: SearchOptions): Promise<SearchResult[]>;
}
