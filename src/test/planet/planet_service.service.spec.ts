import { Test, TestingModule } from "@nestjs/testing";
import { PLANET_REPOSITORY, PlanetService } from "../../planet/planet.service";
import { Fixtures } from "../fixtures";

describe("Planet service", () => {
    const mockPlanetRepository = {
        insert: jest.fn(),
        getAll: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    };

    let planetService: PlanetService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlanetService,
                {
                    useValue: mockPlanetRepository,
                    provide: PLANET_REPOSITORY
                }
            ]
        }).compile();

        planetService = module.get<PlanetService>(PlanetService);
    });

    it("Can create a planet", () => {
        const planet = Fixtures.tatooine();
        planetService.insert(planet);
        expect(mockPlanetRepository.insert).toHaveBeenCalledTimes(1);
    });

    it("Can get all planets", () => {
        planetService.getAll();
        expect(mockPlanetRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it("Can get a planet", () => {
        planetService.get(0);
        expect(mockPlanetRepository.get).toHaveBeenCalledTimes(1);
    });

    it("Can update a planet", () => {
        const planet = Fixtures.tatooine();
        planetService.update(1, planet);
        expect(mockPlanetRepository.update).toHaveBeenCalledTimes(1);
    });

    it("Can delete a planet", () => {
        planetService.delete(1);
        expect(mockPlanetRepository.delete).toHaveBeenCalledTimes(1);
    });
});
