import { Module } from '@nestjs/common';
import { InteractionModule } from 'src/interaction/interaction.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [InteractionModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
