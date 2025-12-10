import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RmqConfigService {
  constructor(private configService: ConfigService) {}

  get RmqUrl() {
    return this.configService.get<string>('RMQ_URL') || '';
  }
}
