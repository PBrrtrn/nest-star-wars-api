import { Coordinates } from "../../coordinates/coordinates.model";
import { Planet } from "../../planet/planet.model";
import { PlanetRepository } from "../../planet/planet_repository.service";
import { Fixtures } from "../fixtures";

describe("Planet repository", () => {
    const planetRepository = new PlanetRepository();

    beforeEach(() => {
        planetRepository.clear();
    });

    test("Can add a planet", () => {
        const naboo = Fixtures.naboo();
        naboo.id = 0;
        planetRepository.insert(naboo);
        expect(planetRepository.getAll()).toStrictEqual([naboo]);
    });

    test("Can get all planets", () => {
        populateRepository(planetRepository);

        const naboo = Fixtures.naboo();
        naboo.id = 0;
        const tatooine = Fixtures.tatooine();
        tatooine.id = 1;

        expect(planetRepository.getAll()).toStrictEqual([naboo, tatooine]);
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

const populateRepository = function(planetRepository: PlanetRepository) {
    const naboo = Fixtures.naboo();
    const tatooine = Fixtures.tatooine();
    planetRepository.insert(naboo);
    planetRepository.insert(tatooine);
}
