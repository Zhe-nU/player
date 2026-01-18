import { LavalinkResponse } from "shoukaku";
import { SearchSource } from "../search.types";


export interface SearchProvider {
  searchByQuery(query: string): Promise<LavalinkResponse>;

  searchByLink(link: string): Promise<LavalinkResponse>;
}