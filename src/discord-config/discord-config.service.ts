import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordConfigService {
  constructor(private configService: ConfigService) {}

  get clientId() {
    return this.configService.get<string>('CLIENT_ID') || '';
  }
}
