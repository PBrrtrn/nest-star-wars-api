import { Coordinates } from "../../coordinates/coordinates.model";

describe("Coordinates", () => {
    const coordinates = new Coordinates(30.0, 15.0);

    test("Have latitude", () => {
        expect(coordinates.latitude).toBe(30.0);
    });

    test("Have longitude", () => {
        expect(coordinates.longitude).toBe(15.0);
    });

    test("Comparison returns true if coordinates match", () => {
        const other = new Coordinates(30.0, 15.0);
        expect(coordinates.equals(other)).toBeTruthy();
    });

    test("Comparison returns false if coordinates do not match", () => {
        const other = new Coordinates(15.0, 30.0);
        expect(coordinates.equals(other)).toBeFalsy();
    });
});
