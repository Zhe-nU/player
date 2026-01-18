import { Injectable } from "@nestjs/common";
import { ShoukakuService } from "src/shoukaku/shoukaku.service";

@Injectable()
export class SearchService {
  constructor (private readonly shoukakuService: ShoukakuService) { }

  
}