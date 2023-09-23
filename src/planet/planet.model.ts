import { ObjectType, Field } from "@nestjs/graphql";
import { Coordinates } from "../coordinates/coordinates.model";

@ObjectType()
export class Planet {
    @Field()
    id: number
    @Field()
    name: string
    @Field()
    population: number
    @Field()
    climate: string
    @Field()
    terrain: string
    @Field()
    coordinates: Coordinates

    constructor(
        id: number,
        name: string,
        population: number,
        climate: string,
        terrain: string,
        coordinates: Coordinates
    ) {
        this.id = id;
        this.name = name;
        this.population = population;
        this.climate = climate;
        this.terrain = terrain;
        this.coordinates = coordinates
    }
}
