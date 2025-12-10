import { Injectable } from '@nestjs/common';
import {
  Events,
  Player,
  Shoukaku,
  Track,
  createDiscordJSOptions,
} from 'shoukaku';
import { InteractionService } from 'src/interaction/interaction.service';
import { EventEmitter } from 'events';
import { DiscordConfigService } from 'src/discord-config/discord-config.service';

@Injectable()
export class PlayerService extends EventEmitter {
  private shoukaku: Shoukaku;

  constructor(
    private discordConfigService: DiscordConfigService,
    private readonly interactionService: InteractionService,
  ) {
    super();
    this.shoukaku = new Shoukaku(
      {
        userId: this.discordConfigService.clientId,
        nodes: [
          {
            name: 'Localhost',
            url: 'localhost:2333',
            auth: 'youshallnotpass',
          },
        ],
        connectorOptions: this.createConnectorOptions(),
      },
      { resume: true },
    );

    this.shoukaku.on(Events.Error, console.error);

    this.shoukaku.connect();
  }

  async joinChannel(guildId: string, channelId: string) {
    try {
      const node = this.shoukaku.getIdealNode();
      if (!node) throw new Error('No available nodes');

      const res = await node.rest.resolve('ytsearch:yoasobi_idol');
      const data = res.data;

      const connection = await this.shoukaku.joinVoiceChannel({
        channelId,
        guildId,
        shardId: 0,
      });

      const player = new Player(connection);
      player.playTrack({ track: { encoded: data[0].encoded } });
    } catch (error) {
      console.log(error);
    }
  }

  async listenEvent(payload: unknown) {
    return this.emit('listenEvent', payload);
  }

  private createConnectorOptions() {
    return {
      client: undefined,
      sendPacket: (_: any, shardId: number, payload: unknown) => {
        // console.log('Sending packet to shard', shardId, payload);
        return this.interactionService.sendPacket(payload);
      },
      listenEvent: (_: any, handler) => {
        // this.on('listenEvent', (payload) => console.log(payload));
        return void this.on('listenEvent', handler);
      },
    };
  }
}
