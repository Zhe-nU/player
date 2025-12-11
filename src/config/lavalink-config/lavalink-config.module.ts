import { Global, Module } from '@nestjs/common';
import { LavalinkConfigService } from './lavalink-config.service';

@Global()
@Module({
  providers: [LavalinkConfigService],
  exports: [LavalinkConfigService],
})
export class LavalinkConfigModule {}
