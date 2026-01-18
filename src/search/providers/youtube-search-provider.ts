import { LavalinkResponse, Node, Track } from "shoukaku";
import { SearchSource } from "../search.types";
import { SearchProvider } from "./search-provider.interface";
import { Injectable } from "@nestjs/common";
import { ShoukakuService } from "src/shoukaku/shoukaku.service";

@Injectable()
export class YouTubeSearchProvider implements SearchProvider {
  constructor(private readonly shoukakuService: ShoukakuService) {}

  async searchByQuery(query: string): Promise<LavalinkResponse> {
    const node = this.shoukakuService.shoukaku.getIdealNode();
    if (!node) throw new Error('No available nodes');

    return await node.rest.resolve(`ytsearch:${query}`)
  }

  async searchByLink(link: string): Promise<LavalinkResponse> {
    const node = this.shoukakuService.shoukaku.getIdealNode();
    if (!node) throw new Error('No available nodes');

    return await node.rest.resolve(link)
  }
}