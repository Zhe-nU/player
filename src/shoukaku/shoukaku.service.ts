import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import EventEmitter from 'events';
import { Events, Shoukaku } from 'shoukaku';
import { DiscordConfigService } from 'src/config/discord-config/discord-config.service';
import { InteractionService } from 'src/interaction/interaction.service';
import { SHOUKAKU_OPTIONS } from './shoukaku.constants';
import { type ShoukakuModuleOptions } from './shoukaku.module';

@Injectable()
export class ShoukakuService extends EventEmitter implements OnModuleInit {
  private logger = new Logger(ShoukakuService.name);
  shoukaku: Shoukaku;

  constructor(
    @Inject(SHOUKAKU_OPTIONS)
    private readonly options: ShoukakuModuleOptions,
    private readonly discordConfigService: DiscordConfigService,
    private readonly interactionService: InteractionService,
  ) {
    super();

    this.shoukaku = new Shoukaku(
      {
        userId: this.discordConfigService.clientId,
        nodes: options.nodes,
        connectorOptions: this.createConnectorOptions(),
      },
      options.options,
    );
  }

  async onModuleInit(): Promise<void> {
    this.shoukaku.once(Events.Ready, () =>
      this.logger.debug('Shoukaku is ready'),
    );

    this.shoukaku.on(Events.Error, (name, error) =>
      this.logger.error(`Shoukaku error on ${name.name}:`, error),
    );

    await this.shoukaku.connect();
  }

  listenEvent(payload: unknown) {
    return this.emit('listenEvent', payload);
  }

  private createConnectorOptions() {
    return {
      client: undefined,
      sendPacket: (_: any, shardId: number, payload: unknown) => {
        return this.interactionService.sendPacket(payload);
      },
      listenEvent: (_: any, handler: (...args: any[]) => void) => {
        return void this.on('listenEvent', handler);
      },
    };
  }
}
