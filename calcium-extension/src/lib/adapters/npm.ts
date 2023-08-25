import { Adapter, type SearchOptions, type SearchResult } from "./base";

type NPMSearchItem = {};

export class NPMAdapter extends Adapter {
  constructor() {
    super();
  }

  async init() {}

  async search({ pattern, limit }: SearchOptions): Promise<SearchResult[]> {
    return [];
  }
}
