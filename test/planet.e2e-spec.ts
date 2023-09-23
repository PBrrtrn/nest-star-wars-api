import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import request = require("supertest");

import { AppModule } from "../src/app.module";
import { PlanetService } from "../src/planet/planet_service.service";
import { Planet } from "../src/planet/planet.model";
import { Coordinates } from "../src/coordinates/coordinates.model";

describe("Planet", () => {
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

    it("Can fetch all planets", async () => {
        const expectedPlanets = [
            { id: 0, name: "Tatooine", population: 3000, climate: "Arid", terrain: "Desert" }
        ]
        await expectPlanetsQuery(app, expectedPlanets)
    });

    it("Can insert a planet", async () => {
        await request(app.getHttpServer())
        .post("/")
        .send({query: `mutation {
            createPlanet(
                name: "Naboo",
                population: 15000,
                climate: "Temperate",
                terrain: "Plains",
                latitude: -40.0,
                longitude: 210.0
            ) {
                id name population climate terrain
            }
        }`})
        .expect(200)
        .expect(response => {
            expect(response.body.data.createPlanet).toEqual({
                id: 1,
                name: "Naboo",
                population: 15000,
                climate: "Temperate",
                terrain: "Plains"
            });
        });

        const expectedPlanets = [
            { id: 0, name: "Tatooine", population: 3000, climate: "Arid", terrain: "Desert" },
            { id: 1, name: "Naboo", population: 15000, climate: "Temperate", terrain: "Plains" }
        ]

        await expectPlanetsQuery(app, expectedPlanets);
    })
});

const populatePlanets = function(planetService: PlanetService) {
    const tatooineCoordinates = new Coordinates(30.0, 30.0);
    const tatooine = new Planet(0, "Tatooine", 3000, "Arid", "Desert", tatooineCoordinates);
    planetService.insert(tatooine);
}

const expectPlanetsQuery = async function(app: INestApplication, expectedPlanets: Object[]) {
    await request(app.getHttpServer())
        .post("/")
        .send({query: 'query { planets { id name population climate terrain } }'})
        .expect(200)
        .expect((response) => {
            expect(response.body.data.planets).toStrictEqual(expectedPlanets);
        });
}
