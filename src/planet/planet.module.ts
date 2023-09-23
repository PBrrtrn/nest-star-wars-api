import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { PlanetRepository } from './planet_repository.service';
import { PlanetResolver } from './planet.resolver';

@Module({
    imports: [],
    providers: [PlanetResolver, PlanetRepository]
})
export class PlanetModule {}
