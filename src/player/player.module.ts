import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { InteractionModule } from 'src/interaction/interaction.module';

@Module({
  imports: [InteractionModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
