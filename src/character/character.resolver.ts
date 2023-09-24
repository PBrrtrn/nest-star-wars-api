import { Resolver, Query, Args, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { Character } from "./character.model";
import { CharacterService } from "./character_service.service";
import { PlanetService } from "../planet/planet_service.service";
import { Planet } from "../planet/planet.model";

// TODO: El service está de más, recibir el repositorio de una e indicar acá el token para recibir el repo
@Resolver((of: Character) => Character)
export class CharacterResolver {
    constructor(private characterService: CharacterService, private planetService: PlanetService) {}

    @Query(() => [Character])
    async characters(): Promise<Character[]> {
        return this.characterService.getAll();
    }

    @Query(() => Character)
    async character(@Args("id") id: number): Promise<Character> {
        return this.characterService.get(id);
    }

    @Mutation(() => Character)
    async createCharacter(
        @Args("name") name: string,
        @Args("species") species: string,
        @Args("forceSensitivity") forceSensitivity: number,
        @Args("locationId") locationId: number
    ): Promise<Character> {
        const planet = this.planetService.get(locationId);
        const createdCharacter = new Character(null, name, species, forceSensitivity, planet);
        return this.characterService.insert(createdCharacter);
    }

    @Mutation(() => Character)
    async updateCharacter(
        @Args("id") id: number,
        @Args("name", { nullable: true }) name: string,
        @Args("species", { nullable: true}) species: string,
        @Args("forceSensitivity", { nullable: true}) forceSensitivity: number
    ): Promise<Character> {
        const character = this.characterService.get(id);
        const updatedCharacter = new Character(
            null,
            name || character.name,
            species || character.species,
            forceSensitivity || character.forceSensitivity,
            character.currentLocation
        );

        return this.characterService.update(id, updatedCharacter);
    }

    @Mutation(() => Character)
    async deleteCharacter(@Args("id") id: number): Promise<Character> {
        return this.characterService.delete(id);
    }

    @ResolveField('currentLocation', () => Planet)
    async currentLocation(@Parent() character: Character): Promise<Planet> {
        return character.currentLocation;
    }
}
