import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { PlanetService } from "../src/planet/planet_service.service";
import { Fixtures } from "../src/test/fixtures";
import { CharacterService } from "../src/character/character_service.service";

import request = require("supertest");
import { response } from "express";

describe("Characters endpoint", () => {
    let app: INestApplication;
    let server: any;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();

        server = app.getHttpServer()

        const planetService = moduleFixture.get<PlanetService>(PlanetService);
        populatePlanets(planetService);

        const charactersService = moduleFixture.get<CharacterService>(CharacterService);
        populateCharacters(charactersService);
    });

    afterAll(async () => {
        await app.close();
        server.close();
    });

    const serializedLukeSkywalker = {
        id: 0,
        name: "Luke Skywalker",
        species: "Human",
        forceSensitivity: 0.9,
        currentLocation: {
            id: 0,
            name: "Tatooine"
        }
    };

    it("Can fetch all characters", async () => {
        await expectCharactersQuery(app, [serializedLukeSkywalker])
    });

    it("Can fetch character by ID", async () => {
        await request(app.getHttpServer())
            .post("/")
            .send({query: `query {
                character(id: 0) {
                    id name species forceSensitivity currentLocation { id name }
                }
            }`})
            .expect(200)
            .expect((response) => {
                expect(response.body.data.character).toStrictEqual(serializedLukeSkywalker)
            });
    });

    it("Can insert a character", async () => {
        const serializedPaulAtreides = {
            id: 1,
            name: "Paul Atreides",
            species: "Human",
            forceSensitivity: 0.99,
            currentLocation: {
                id: 0,
                name: "Tatooine"
            }
        };

        await request(app.getHttpServer())
            .post("/")
            .send({query: `mutation {
                createCharacter(
                    name: "Paul Atreides",
                    species: "Human",
                    forceSensitivity: 0.99,
                    locationId: 0
                ) { id name species forceSensitivity currentLocation { id name } }
            }`})
            .expect(200)
            .expect(response => {
                expect(response.body.data.createCharacter).toStrictEqual(serializedPaulAtreides);
            });

        await expectCharactersQuery(app, [serializedLukeSkywalker, serializedPaulAtreides]);
    });

    it("Can update a character by ID", async () => {
        const expectedUpdatedCharacter = {
            id: 0,
            name: "Luke Skywalker",
            species: "Jedi",
            forceSensitivity: 0.95,
            currentLocation: {
                id: 0,
                name: "Tatooine"
            }
        };

        await request(app.getHttpServer())
            .post("/")
            .send({query: `mutation {
                updateCharacter(
                    id: 0,
                    species: "Jedi",
                    forceSensitivity: 0.95
                ) { id name species forceSensitivity currentLocation { id name } }
            }`})
            .expect(200)
            .expect(response => {
                expect(response.body.data.updateCharacter).toStrictEqual(expectedUpdatedCharacter);
            });
        
        await expectCharactersQuery(app, [expectedUpdatedCharacter]);
    });

    it("Can delete a character by ID", async () => {
        await request(app.getHttpServer())
            .post("/")
            .send({query: `mutation {
                deleteCharacter(id: 0) { id name species forceSensitivity currentLocation { id name } }
            }`})
            .expect(200)
            .expect(response => {
                expect(response.body.data.deleteCharacter).toStrictEqual(serializedLukeSkywalker);
            });
        
        await expectCharactersQuery(app, []);
    });
});

const populatePlanets = function(planetService: PlanetService) {
    planetService.insert(Fixtures.tatooine());
}

const populateCharacters = function(characterService: CharacterService) {
    characterService.insert(Fixtures.lukeSkywalker())
}

const expectCharactersQuery = async function(app: INestApplication, expectedCharacters: Object[]) {
    await request(app.getHttpServer())
        .post("/")
        .send({query: `query { characters { id name species forceSensitivity currentLocation { id name } } }`})
        .expect(200)
        .expect((response) => {
            expect(response.body.data.characters).toStrictEqual(expectedCharacters);
        });
}
