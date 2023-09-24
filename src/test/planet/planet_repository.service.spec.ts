import { Test, TestingModule } from "@nestjs/testing";
import { Coordinates } from "../../coordinates/coordinates.model";
import { Planet } from "../../planet/planet.model";
import { Fixtures } from "../fixtures";
import { InMemoryPlanetRepository } from "../../planet/planet_repository.service";

describe("In memory planet repository", () => {
    const planetRepository = new InMemoryPlanetRepository();
    beforeEach(async () => {
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

    it("Can get a planet by ID", () => {
        populateRepository(planetRepository);

        const naboo = Fixtures.naboo();
        expect(planetRepository.get(1)).toStrictEqual(naboo);
    });

    test("Can update a planet by ID", () => {
        populateRepository(planetRepository);
        const updatedPlanet = new Planet(null, "Naboo", 40000, "Temperate", "Plains", new Coordinates(-40.0, 210.0));
        planetRepository.update(1, updatedPlanet);
        expect(planetRepository.get(1)).toStrictEqual(updatedPlanet);
    });

    test("Can delete a planet by ID", () => {
        populateRepository(planetRepository);
        planetRepository.delete(1);

        const tatooine = Fixtures.tatooine();
        expect(planetRepository.getAll()).toStrictEqual([tatooine]);
    });
});

const populateRepository = function(planetRepository: InMemoryPlanetRepository) {
    const tatooine = Fixtures.tatooine();
    const naboo = Fixtures.naboo();
    planetRepository.insert(tatooine);
    planetRepository.insert(naboo);
}
