import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PlanetModule } from './planet/planet.module';
import { join } from 'path';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      path: "/"
    }),
    CharacterModule
  ]
})
export class AppModule {}
