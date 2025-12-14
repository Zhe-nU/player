import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShoukakuService } from 'src/shoukaku/shoukaku.service';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly shoukakuService: ShoukakuService,
  ) {}

  @MessagePattern({ cmd: 'joinChannel' })
  async joinChannel(@Payload() data: { guildId: string; channelId: string }) {
    await this.playerService.joinChannel(data.guildId, data.channelId);
    return { success: true };
  }

  @MessagePattern({ cmd: 'listenEvent' })
  listenEvent(payload: unknown) {
    this.shoukakuService.listenEvent(payload);
  }

  @MessagePattern({ cmd: 'playTrack' })
  async playTrack(
    @Payload() data: { guildId: string; channelId: string; query: string },
  ) {
    await this.playerService.playTrack(
      data.guildId,
      data.channelId,
      data.query,
    );
    return { success: true };
  }
}
