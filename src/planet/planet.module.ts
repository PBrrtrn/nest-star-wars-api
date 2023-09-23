import { Module } from '@nestjs/common';

import { PlanetRepository } from './planet_repository.service';
import { PlanetResolver } from './planet.resolver';
import { InMemoryPlanetDataStorage, PLANET_DATA_STORAGE } from './planet_data_storage.service';

@Module({
    imports: [],
    providers: [
        PlanetResolver,
        PlanetRepository,
        {
            provide: PLANET_DATA_STORAGE,
            useClass: InMemoryPlanetDataStorage
        }
    ]
})
export class PlanetModule {}
