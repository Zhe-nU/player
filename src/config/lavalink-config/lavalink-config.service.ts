import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LavalinkConfigService {
  constructor(private configService: ConfigService) {}

  get nodeName() {
    return this.configService.get<string>('LAVALINK_NODE_NAME') || '';
  }

  get nodeUrl() {
    return this.configService.get<string>('LAVALINK_NODE_URL') || '';
  }

  get nodePassword() {
    return this.configService.get<string>('LAVALINK_NODE_PASSWORD') || '';
  }
}
