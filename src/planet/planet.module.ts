import { Module } from '@nestjs/common';

import { PlanetService, PLANET_REPOSITORY } from './planet_service.service';
import { PlanetResolver } from './planet.resolver';
import { InMemoryRepository } from '../repository/repository.service';
import { Planet } from './planet.model';

@Module({
    imports: [],
    providers: [
        PlanetResolver,
        PlanetService,
        { provide: PLANET_REPOSITORY, useClass: InMemoryRepository<Planet> }
    ],
    exports: [
        PlanetResolver,
        PlanetService
    ]
})
export class PlanetModule {}
