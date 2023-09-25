import { Character } from "../character/character.model";
import { Coordinates } from "../coordinates/coordinates.model";
import { Planet } from "../planet/planet.model";

export class Fixtures {
    static tatooineCoordinates = new Coordinates(30.0, 30.0);
    static nabooCoordinates = new Coordinates(-40.0, 210.0);

    static tatooine(): Planet {
        return new Planet(0, "Tatooine", 3000, "Arid", "Desert", this.tatooineCoordinates);
    }

    static lukeSkywalker(): Character {
        return new Character(0, "Luke Skywalker", "Human", 0.9, this.tatooine());
    }

    static hanSolo(): Character {
        return new Character(1, "Han Solo", "Human", 0.05, this.tatooine());
    }
}