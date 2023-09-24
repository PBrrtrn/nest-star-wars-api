import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Planet } from "../planet/planet.model";
import { PlanetService } from "./planet_service.service";
import { Coordinates } from "../coordinates/coordinates.model";

@Resolver((of: Planet) => Planet)
export class PlanetResolver {
    constructor(private planetService: PlanetService) {}

    @Query(() => [Planet])
    planets(): Planet[] {
        return this.planetService.getAll();
    }

    @Query(() => Planet)
    planet(@Args("id") id: number) {
        return this.planetService.get(id);
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
        return this.planetService.insert(planet);
    }

    @Mutation(() => Planet)
    updatePlanet(
        @Args("id") id: number,
        @Args("name", { nullable: true }) name: string,
        @Args("population", { nullable: true }) population: number,
        @Args("climate", { nullable: true }) climate: string,
        @Args("terrain", { nullable: true }) terrain: string,
        @Args("latitude", { nullable: true }) latitude: number,
        @Args("longitude", { nullable: true }) longitude: number
    ): Planet {
        const planet = this.planetService.get(id);
        const planetCoordinates = planet.coordinates;

        const coordinates = new Coordinates(
            latitude || planetCoordinates.latitude,
            longitude || planetCoordinates.longitude
        );

        const updatedPlanet = new Planet(
            id,
            name || planet.name,
            population || planet.population,
            climate || planet.climate,
            terrain || planet.terrain,
            coordinates
        );

        return this.planetService.update(id, updatedPlanet);
    }

    @Mutation(() => Planet)
    deletePlanet(@Args("id") id: number): Planet {
        return this.planetService.delete(id);
    }
}
