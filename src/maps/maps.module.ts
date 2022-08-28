import { Module } from '@nestjs/common';
import { MapsService } from '../maps/services/maps/maps.service';

@Module({
  providers: [MapsService],
  exports: [MapsService],
})
export class MapsModule {}
