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

export type Color = "primary" | "secondary";

export abstract class Adapter {
  tag: string;

  abstract init(): Promise<void>;

  abstract search(pattern: string): Promise<SearchResult[]>;
}
