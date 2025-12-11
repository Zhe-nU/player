import { Module } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqConfigService } from 'src/config/rmq-config/rmq-config.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'INTERACTION_SERVICE',
        inject: [RmqConfigService],
        useFactory: (rmqConfigService: RmqConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [rmqConfigService.RmqUrl],
            queue: 'interaction_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  providers: [InteractionService],
  exports: [InteractionService],
})
export class InteractionModule {}
