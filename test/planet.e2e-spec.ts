import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import request = require("supertest");

import { AppModule } from "../src/app.module";
import { PlanetService } from "../src/planet/planet_service.service";
import { Planet } from "../src/planet/planet.model";
import { Coordinates } from "../src/coordinates/coordinates.model";

describe("E2E", () => {
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

    const serializedTatooine = {
        id: 0,
        name: "Tatooine",
        population: 3000,
        climate: "Arid",
        terrain: "Desert",
        coordinates: {
            latitude: 30.0,
            longitude: 30.0
        } 
    }

    it("Can fetch all planets", async () => {
        await expectPlanetsQuery(app, [serializedTatooine])
    });

    it("Can fetch a planet by ID", async () => {
        await request(app.getHttpServer())
            .post("/")
            .send({query: `query { planet(id: 0) { id name population climate terrain coordinates { latitude longitude } } }`})
            .expect(200)
            .expect(response => {
                expect(response.body.data.planet).toStrictEqual(serializedTatooine);
            });
    });

    it("Can insert a planet", async () => {
        const serializedNaboo = {
            id: 1,
            name: "Naboo",
            population: 15000,
            climate: "Temperate",
            terrain: "Plains",
            coordinates: {
                latitude: -40.0,
                longitude: 210.0
            }
        }
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
                    id name population climate terrain coordinates { latitude longitude }
                }
            }`})
            .expect(200)
            .expect(response => {
                expect(response.body.data.createPlanet).toStrictEqual(serializedNaboo);
            });

        await expectPlanetsQuery(app, [serializedTatooine, serializedNaboo]);
    });

    it("Can update a planet by ID", async () => {
        const expectedUpdatedPlanet = {
            id: 0,
            name: "Tatooine",
            population: 4000,
            climate: "Arid",
            terrain: "Desert",
            coordinates: {
                latitude: 30.0,
                longitude: 30.0
            }
        };

        await request(app.getHttpServer())
            .post("/")
            .send({query: `mutation {
                updatePlanet(
                    id: 0,
                    population: 4000
                ) {
                    id name population climate terrain coordinates { latitude longitude }
                }
            }`})
            .expect(200)
            .expect(response => {
                expect(response.body.data.updatePlanet).toStrictEqual(expectedUpdatedPlanet);
            });
        
        await expectPlanetsQuery(app, [expectedUpdatedPlanet]);
    });

    it("Can delete a planet by ID", async () => {
        await request(app.getHttpServer())
            .post("/")
            .send({query: `mutation { deletePlanet(id: 0) { id, name, population, climate, terrain coordinates { latitude longitude } } }`})
            .expect(200)
            .expect(response => {
                expect(response.body.data.deletePlanet).toStrictEqual(serializedTatooine);
            });
        
        await expectPlanetsQuery(app, []);
    });
});

const populatePlanets = function(planetService: PlanetService) {
    const tatooineCoordinates = new Coordinates(30.0, 30.0);
    const tatooine = new Planet(0, "Tatooine", 3000, "Arid", "Desert", tatooineCoordinates);
    planetService.insert(tatooine);
}

const expectPlanetsQuery = async function(app: INestApplication, expectedPlanets: Object[]) {
    await request(app.getHttpServer())
        .post("/")
        .send({query: 'query { planets { id name population climate terrain coordinates { latitude longitude } } }'})
        .expect(200)
        .expect((response) => {
            expect(response.body.data.planets).toStrictEqual(expectedPlanets);
        });
}
