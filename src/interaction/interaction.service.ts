import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InteractionService {
  constructor(
    @Inject('INTERACTION_SERVICE')
    private readonly intractionClient: ClientProxy,
  ) {}

  sendPacket(payload: unknown) {
    this.intractionClient.emit({ cmd: 'sendPacket' }, payload);
  }
}
