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

export type HighlightSegment = {
  text: string;
  color?: Color;
};

export abstract class Adapter {
  tag: string;
  url?: string;

  abstract init(): Promise<void>;

  highlight(pattern: string): HighlightSegment[] {
    return [{ text: pattern }];
  }

  abstract search(pattern: string): Promise<SearchResult[]>;
}
