import { Test, TestingModule } from "@nestjs/testing";
import { Coordinates } from "../../coordinates/coordinates.model";
import { Planet } from "../../planet/planet.model";
import { PlanetService, PLANET_REPOSITORY } from "../../planet/planet_service.service";
import { Fixtures } from "../fixtures";
import { InMemoryPlanetRepository } from "../../planet/planet_repository.service";

describe("Planet repository", () => {
    let planetRepository: PlanetService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlanetService,
                {
                    useClass: InMemoryPlanetRepository,
                    provide: PLANET_REPOSITORY
                }
            ]
        }).compile();

        planetRepository = module.get<PlanetService>(PlanetService);
        planetRepository.clear();
    });

    it("Can add a planet", () => {
        const tatooine = Fixtures.tatooine();
        planetRepository.insert(tatooine);
        expect(planetRepository.getAll()).toStrictEqual([tatooine]);
    });

    it("Can get all planets", () => {
        populateRepository(planetRepository);
        const tatooine = Fixtures.tatooine();
        const naboo = Fixtures.naboo();

        expect(planetRepository.getAll()).toStrictEqual([tatooine, naboo]);
    });

    /*
    test("Can get a planet by ID", () => {
        populateRepository(planetRepository);

        const tatooine = Fixtures.tatooine();
        tatooine.id = 1;

        expect(planetRepository.get(1)).toStrictEqual(tatooine);
    });

    test("Can update a planet by ID", () => {
        populateRepository(planetRepository);
        const updatedPlanet = new Planet("Tatooine", 4000, "Arid", "Rocky", new Coordinates(30.0, 30.0), 0);
        planetRepository.update(0, updatedPlanet);
        expect(planetRepository.get(0)).toStrictEqual(updatedPlanet);
    });

    test("Can delete a planet by ID", () => {
        populateRepository(planetRepository);
        planetRepository.delete(1);

        const naboo = Fixtures.naboo();
        naboo.id = 0;
        expect(planetRepository.getAll()).toStrictEqual([naboo]);
    });
    */
});

const populateRepository = function(planetRepository: PlanetService) {
    const tatooine = Fixtures.tatooine();
    const naboo = Fixtures.naboo();
    planetRepository.insert(tatooine);
    planetRepository.insert(naboo);
}
