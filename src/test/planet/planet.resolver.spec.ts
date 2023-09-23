import { Test, TestingModule } from "@nestjs/testing";
import { PlanetResolver } from "../../planet/planet.resolver";
import { PlanetRepository } from "../../planet/planet_repository.service";
import { Planet } from "../../planet/planet.model";
import { Coordinates } from "../../coordinates/coordinates.model";

describe("Planet resolver", () => {
    let planetResolver: PlanetResolver;
    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlanetResolver, PlanetRepository]
        }).compile();

        const planetRepository: PlanetRepository = module.get<PlanetRepository>(PlanetRepository);
        planetRepository.clear();

        planetResolver = module.get<PlanetResolver>(PlanetResolver);
    })
    
    it("Is defined", () => {
        expect(planetResolver).toBeDefined();
    });

    it("Can fetch all planets", () => {
        const planets = planetResolver.planets();
        expect(planets).toStrictEqual([]);
    });

    it("Can create a planet", () => {
        const createdPlanet = planetResolver.createPlanet("Tatooine", 3000, "Arid", "Desert", 30.0, 30.0);
        const expectedPlanet = new Planet(0, "Tatooine", 3000, "Arid", "Desert", new Coordinates(30.0, 30.0))
        expect(createdPlanet).toStrictEqual(expectedPlanet);
    });
});
