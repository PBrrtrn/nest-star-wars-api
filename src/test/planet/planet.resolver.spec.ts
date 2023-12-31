import { Test, TestingModule } from "@nestjs/testing";
import { PlanetResolver } from "../../planet/planet.resolver";
import { PLANET_REPOSITORY, PlanetService } from "../../planet/planet.service";
import { Planet } from "../../planet/planet.model";
import { Coordinates } from "../../coordinates/coordinates.model";
import { Fixtures } from "../fixtures";
import { InMemoryRepository } from "../../repository/repository.service";

describe("Planet resolver", () => {
    let planetResolver: PlanetResolver;
    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlanetResolver,
                PlanetService,
                {
                    useClass: InMemoryRepository<Planet>,
                    provide: PLANET_REPOSITORY
                }
            ]
        }).compile();

        const planetRepository: InMemoryRepository<Planet> = module.get<InMemoryRepository<Planet>>(PLANET_REPOSITORY);
        planetRepository.clear();
        planetRepository.insert(Fixtures.tatooine());
        planetRepository.insert(new Planet(null, "Arrakis", 15000000, "Arid", "Desert", new Coordinates(-30.0, -30.0)));

        planetResolver = module.get<PlanetResolver>(PlanetResolver);
    })
    
    it("Is defined", () => {
        expect(planetResolver).toBeDefined();
    });

    it("Can fetch all planets", async () => {
        const planets = await planetResolver.planets();
        expect(planets).toStrictEqual([
            Fixtures.tatooine(),
            new Planet(1, "Arrakis", 15000000, "Arid", "Desert", new Coordinates(-30.0, -30.0))
        ]);
    });

    it("Can fetch a planet by ID", async () => {
        const expectedPlanet = new Planet(1, "Arrakis", 15000000, "Arid", "Desert", new Coordinates(-30.0, -30.0));
        const planet = await planetResolver.planet(1);
        expect(planet).toStrictEqual(expectedPlanet);
    });

    it("Can create a planet", async () => {
        const createdPlanet = await planetResolver.createPlanet("Tatooine", 3000, "Arid", "Desert", 30.0, 30.0);
        const expectedPlanet = new Planet(2, "Tatooine", 3000, "Arid", "Desert", new Coordinates(30.0, 30.0))
        expect(createdPlanet).toStrictEqual(expectedPlanet);
    });

    it("Can update a planet", async () => {
        const updatedPlanet = await planetResolver.updatePlanet(0, null, 4000, null, null, null, null);
        const expectedPlanet = new Planet(0, "Tatooine", 4000, "Arid", "Desert", new Coordinates(30.0, 30.0));
        expect(updatedPlanet).toStrictEqual(expectedPlanet);
    });

    it("Can delete a planet", async () => {
        const deletedPlanet = await planetResolver.deletePlanet(0);
        expect(deletedPlanet).toStrictEqual(Fixtures.tatooine());
    });
});
