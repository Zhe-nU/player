import { Injectable } from '@nestjs/common';
import { Connection, LoadType, Player, Track } from 'shoukaku';
import { ShoukakuService } from 'src/shoukaku/shoukaku.service';

@Injectable()
export class PlayerService {
  private connection?: WeakRef<Connection>;

  constructor(private readonly shoukakuService: ShoukakuService) {}

  private async _getConnection(guildId: string, channelId: string) {
    if (!this.connection) await this.joinChannel(guildId, channelId);
    return this.connection!;
  }

  async joinChannel(guildId: string, channelId: string) {
    this.connection = await this.shoukakuService.shoukaku.joinVoiceChannel({
      channelId,
      guildId,
      shardId: 0,
    });
  }

  async playTrack(guildId: string, channelId: string, query: string) {
    const connection = await this._getConnection(guildId, channelId);

    const player = new Player(connection);

    const [track] = await this.searchTracks(query);

    await player.playTrack({ track: { encoded: track.encoded } });
  }

  async searchTracks(query: string): Promise<Track[]> {
    const node = this.shoukakuService.shoukaku.getIdealNode();
    if (!node) throw new Error('No available nodes');

    const res = await node.rest.resolve(`ytsearch:${query}`);

    if (res.loadType === LoadType.Search) return res.data;

    if (res.loadType === LoadType.Empty) return [];

    if (res.loadType === LoadType.Error) throw new Error(res.data.message);

    return [];
  }
}
