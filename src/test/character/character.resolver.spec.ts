import { Test, TestingModule } from "@nestjs/testing";
import { CharacterResolver } from "../../character/character.resolver";
import { CHARACTER_REPOSITORY, CharacterService } from "../../character/character.service";
import { InMemoryRepository } from "../../repository/repository.service";
import { Character } from "../../character/character.model";
import { Fixtures } from "../fixtures";
import { PLANET_REPOSITORY, PlanetService } from "../../planet/planet.service";
import { Planet } from "../../planet/planet.model";

describe("Character resolver", () => {
    let characterResolver: CharacterResolver;
    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CharacterResolver,
                CharacterService,
                PlanetService,
                { provide: CHARACTER_REPOSITORY, useClass: InMemoryRepository<Character> },
                { provide: PLANET_REPOSITORY, useClass: InMemoryRepository<Planet> }
            ]
        }).compile();

        const planetRepository: InMemoryRepository<Planet> = module.get<InMemoryRepository<Planet>>(PLANET_REPOSITORY);
        planetRepository.clear();
        planetRepository.insert(Fixtures.tatooine());

        const characterRepository: InMemoryRepository<Character> = module.get<InMemoryRepository<Character>>(CHARACTER_REPOSITORY);
        characterRepository.clear();
        characterRepository.insert(Fixtures.lukeSkywalker());
        characterRepository.insert(Fixtures.hanSolo());

        characterResolver = module.get<CharacterResolver>(CharacterResolver);
    });

    it("Is defined", () => {
        expect(characterResolver).toBeDefined();
    });

    it("Can fetch all characters", async () => {
        const characters = await characterResolver.characters();
        expect(characters).toStrictEqual([Fixtures.lukeSkywalker(), Fixtures.hanSolo()]);
    });

    it("Can fetch a character by ID", async () => {
        const character = await characterResolver.character(1);
        expect(character).toStrictEqual(Fixtures.hanSolo());
    });

    it("Can create a character", async () => {
        const createdCharacter = await characterResolver.createCharacter("Paul Atreides", "Human", 0.99, 0);
        const expectedCharacter = new Character(2, "Paul Atreides", "Human", 0.99, Fixtures.tatooine());
        expect(createdCharacter).toStrictEqual(expectedCharacter);
    });

    it("Can update a charactert", async () => {
        const updatedCharacter = await characterResolver.updateCharacter(1, "Han Solo Skywalker", null, 0.1);
        const expectedCharacter = new Character(1, "Han Solo Skywalker", "Human", 0.1, Fixtures.tatooine());
        expect(updatedCharacter).toStrictEqual(expectedCharacter);
    });

    it("Can delete a character", async () => {
        const deletedCharacter = await characterResolver.deleteCharacter(0);
        expect(deletedCharacter).toStrictEqual(Fixtures.lukeSkywalker());
    });
});
