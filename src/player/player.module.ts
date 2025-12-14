import { Module } from '@nestjs/common';
import { LavalinkConfigService } from 'src/config/lavalink-config/lavalink-config.service';
import { InteractionModule } from 'src/interaction/interaction.module';
import { ShoukakuModule } from 'src/shoukaku/shoukaku.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [
    InteractionModule,
    ShoukakuModule.forRootAsync({
      imports: [InteractionModule],
      useFactory: (config: LavalinkConfigService) => ({
        nodes: [
          {
            name: config.nodeName,
            url: config.nodeUrl,
            auth: config.nodePassword,
          },
        ],
        options: {
          resume: true,
        },
      }),
      inject: [LavalinkConfigService],
    }),
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
