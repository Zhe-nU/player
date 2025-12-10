import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { RmqConfigService } from './rmq-config/rmq-config.service';
import { RmqConfigModule } from './rmq-config/rmq-config.module';
import { ConfigModule } from '@nestjs/config';
import { InteractionService } from './interaction/interaction.service';
import { InteractionModule } from './interaction/interaction.module';
import { DiscordConfigModule } from './discord-config/discord-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InteractionModule,
    PlayerModule,
    RmqConfigModule,
    DiscordConfigModule,
  ],
})
export class AppModule {}
