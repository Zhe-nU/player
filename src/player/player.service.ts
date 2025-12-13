import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Events, Player, Shoukaku } from 'shoukaku';
import { DiscordConfigService } from 'src/config/discord-config/discord-config.service';
import { LavalinkConfigService } from 'src/config/lavalink-config/lavalink-config.service';
import { InteractionService } from 'src/interaction/interaction.service';

@Injectable()
export class PlayerService extends EventEmitter {
  private shoukaku: Shoukaku;

  constructor(
    private discordConfigService: DiscordConfigService,
    private lavalinkConfigService: LavalinkConfigService,
    private readonly interactionService: InteractionService,
  ) {
    super();
    this.shoukaku = new Shoukaku(
      {
        userId: this.discordConfigService.clientId,
        nodes: [
          {
            name: this.lavalinkConfigService.nodeName,
            url: this.lavalinkConfigService.nodeUrl,
            auth: this.lavalinkConfigService.nodePassword,
          },
        ],
        connectorOptions: this.createConnectorOptions(),
      },
      { resume: true },
    );

    this.shoukaku.on(Events.Error, console.error);

    void this.shoukaku.connect();
  }

  async joinChannel(guildId: string, channelId: string) {
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
    await player.playTrack({ track: { encoded: data[0].encoded } }); // eslint-disable-line
  }

  listenEvent(payload: unknown) {
    return this.emit('listenEvent', payload);
  }

  private createConnectorOptions() {
    return {
      client: undefined,
      sendPacket: (_: any, shardId: number, payload: unknown) => {
        // console.log('Sending packet to shard', shardId, payload);
        return this.interactionService.sendPacket(payload);
      },
      listenEvent: (_: any, handler: (...args: any[]) => void) => {
        // this.on('listenEvent', (payload) => console.log(payload));
        return void this.on('listenEvent', handler);
      },
    };
  }
}
