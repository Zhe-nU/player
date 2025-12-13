import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @MessagePattern({ cmd: 'joinChannel' })
  async joinChannel(@Payload() data: { guildId: string; channelId: string }) {
    await this.playerService.joinChannel(data.guildId, data.channelId);
    return { success: true };
  }

  @MessagePattern({ cmd: 'listenEvent' })
  listenEvent(payload: unknown) {
    // console.log('listenEvent', payload);
    this.playerService.listenEvent(payload);
  }
}
