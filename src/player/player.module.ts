import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { InteractionModule } from 'src/interaction/interaction.module';
import { DiscordConfigModule } from 'src/discord-config/discord-config.module';

@Module({
  imports: [DiscordConfigModule, InteractionModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
