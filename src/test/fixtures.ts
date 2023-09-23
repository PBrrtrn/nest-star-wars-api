import { Coordinates } from "../coordinates/coordinates.model";
import { Planet } from "../planet/planet.model";

export class Fixtures {
    static tatooineCoordinates = new Coordinates(30.0, 30.0);
    static nabooCoordinates = new Coordinates(-40.0, 210.0);

    static tatooine(): Planet {
        return new Planet(0, "Tatooine", 3000, "Arid", "Desert", this.tatooineCoordinates);
    }

    static naboo(): Planet {
        return new Planet(1, "Naboo", 15000, "Temperate", "Plains", this.nabooCoordinates);
    }
}