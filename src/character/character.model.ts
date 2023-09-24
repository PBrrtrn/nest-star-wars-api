import { ObjectType, Field } from "@nestjs/graphql";
import { Planet } from "../planet/planet.model";

@ObjectType()
export class Character {
    @Field()
    id: number;
    @Field()
    name: string;
    @Field()
    species: string;
    @Field()
    forceSensitivity: number
    @Field()
    currentLocation: Planet

    constructor(
        id: number,
        name: string,
        species: string,
        forceSensitivity: number,
        currentLocation: Planet
    ) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.forceSensitivity = forceSensitivity;
        this.currentLocation = currentLocation;
    }
}
