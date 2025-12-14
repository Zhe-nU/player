import { Injectable } from '@nestjs/common';
import { Player } from 'shoukaku';
import { ShoukakuService } from 'src/shoukaku/shoukaku.service';

@Injectable()
export class PlayerService {
  constructor(private readonly shoukakuService: ShoukakuService) {}

  async joinChannel(guildId: string, channelId: string) {
    const node = this.shoukakuService.shoukaku.getIdealNode();
    if (!node) throw new Error('No available nodes');

    const res = await node.rest.resolve('ytsearch:yoasobi_idol');
    const data = res.data;

    const connection = await this.shoukakuService.shoukaku.joinVoiceChannel({
      channelId,
      guildId,
      shardId: 0,
    });

    const player = new Player(connection);
    await player.playTrack({ track: { encoded: data[0].encoded } }); // eslint-disable-line
  }
}
