import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Planet } from "../planet/planet.model";
import { PlanetRepository } from "./planet_repository.service";
import { Coordinates } from "../coordinates/coordinates.model";

@Resolver((of: Planet) => Planet)
export class PlanetResolver {
    constructor(private planetRepository: PlanetRepository) {}

    @Query(() => [Planet])
    planets(): Planet[] {
        return this.planetRepository.getAll();
    }

    @Mutation(() => Planet)
    createPlanet(
        @Args("name") name: string,
        @Args("population") population: number,
        @Args("climate") climate: string,
        @Args("terrain") terrain: string,
        @Args("latitude") latitude: number,
        @Args("longitude") longitude: number
    ): Planet {
        const planet = new Planet(null, name, population, climate, terrain, new Coordinates(latitude, longitude));
        return this.planetRepository.insert(planet);
    }
}
