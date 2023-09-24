import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { PlanetService } from "../src/planet/planet_service.service";
import { Coordinates } from "../src/coordinates/coordinates.model";
import { Planet } from "../src/planet/planet.model";

import request = require("supertest");

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
    });

    afterAll(async () => {
        await app.close();
        server.close();
    });

    it("Can fetch all characters", async () => {
        await expectCharactersQuery(app, [])
    });
});

const populatePlanets = function(planetService: PlanetService) {
    const tatooineCoordinates = new Coordinates(30.0, 30.0);
    const tatooine = new Planet(0, "Tatooine", 3000, "Arid", "Desert", tatooineCoordinates);
    planetService.insert(tatooine);
}

const expectCharactersQuery = async function(app: INestApplication, expectedCharacters: Object[]) {
    await request(app.getHttpServer())
        .post("/")
        .send({query: `query {
            characters {
                id
                name
                species
                forceSensitivity
                currentLocation { id, name population }
            }
        }`})
        .expect(200)
        .expect((response) => {
            expect(response.body.data.characters).toStrictEqual(expectedCharacters);
        });
}
