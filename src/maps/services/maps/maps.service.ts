import {
  Client,
  Distance,
  TravelMode,
} from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapsService extends Client {
  private readonly accessKey = process.env.GOOGLE_MAPS_ACCESS_KEY;

  constructor() {
    super();
  }

  async calculateDistance(
    startAddress: string,
    destinationAddress: string,
  ): Promise<Distance> {
    const googleRes = await this.distancematrix({
      params: {
        origins: [startAddress],
        destinations: [destinationAddress],
        mode: TravelMode.bicycling,
        key: this.accessKey,
      },
    });

    const distance = googleRes.data.rows[0].elements[0].distance;

    return distance;
  }
}
