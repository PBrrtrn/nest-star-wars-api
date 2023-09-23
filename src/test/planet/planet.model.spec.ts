import { Coordinates } from "../../coordinates/coordinates.model";
import { Planet } from "../../planet/planet.model";

describe("Planet", () => {
    const coordinates = new Coordinates(30.0, 30.0);
    const tatooine = new Planet(0, "Tatooine", 3000, "Arid", "Desert", coordinates);

    it("Has an ID", () => {
        expect(tatooine.id).toBe(0);
    });

    test("Has a name", () => {
        expect(tatooine.name).toBe("Tatooine");
    });

    test("Has population", () => {
        expect(tatooine.population).toBe(3000);
    });

    test("Has a climate", () => {
        expect(tatooine.climate).toBe("Arid");
    });

    test("Has a terrain", () => {
        expect(tatooine.terrain).toBe("Desert");
    });

    test("Has coordinates", () => {
        expect(tatooine.coordinates).toBe(coordinates);
    });
});
