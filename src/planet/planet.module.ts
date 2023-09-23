import { Module } from '@nestjs/common';

import { PlanetService, PLANET_REPOSITORY } from './planet_service.service';
import { PlanetResolver } from './planet.resolver';
import { InMemoryPlanetRepository } from './planet_repository.service';

@Module({
    imports: [],
    providers: [
        PlanetResolver,
        PlanetService,
        {
            provide: PLANET_REPOSITORY,
            useClass: InMemoryPlanetRepository
        }
    ]
})
export class PlanetModule {}
