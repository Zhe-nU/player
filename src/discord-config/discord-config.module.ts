import { Module } from '@nestjs/common';
import { DiscordConfigService } from './discord-config.service';

@Module({
  providers: [DiscordConfigService],
  exports: [DiscordConfigService],
})
export class DiscordConfigModule {}
