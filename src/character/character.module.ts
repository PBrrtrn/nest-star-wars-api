import { Module } from '@nestjs/common';

import { CharacterService, CHARACTER_REPOSITORY } from './character.service';
import { CharacterResolver } from './character.resolver';
import { InMemoryRepository } from '../repository/repository.service';
import { Character } from './character.model';
import { PLANET_REPOSITORY, PlanetService } from '../planet/planet.service';
import { Planet } from '../planet/planet.model';
import { PlanetModule } from '../planet/planet.module';

@Module({
    imports: [PlanetModule],
    providers: [
        CharacterResolver,
        CharacterService,
        { provide: CHARACTER_REPOSITORY, useClass: InMemoryRepository<Character> }
    ]
})
export class CharacterModule {}
