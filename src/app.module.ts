import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordConfigModule } from './config/discord-config/discord-config.module';
import { LavalinkConfigModule } from './config/lavalink-config/lavalink-config.module';
import { RmqConfigModule } from './config/rmq-config/rmq-config.module';
import { InteractionModule } from './interaction/interaction.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DiscordConfigModule,
    InteractionModule,
    LavalinkConfigModule,
    PlayerModule,
    RmqConfigModule,
  ],
})
export class AppModule {}
