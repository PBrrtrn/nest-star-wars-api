import { Injectable } from "@nestjs/common";
import { Planet } from "./planet.model";

@Injectable()
export class PlanetRepository {
    private data: {[key: number]: Planet} = {};
    private currentId = 0;

    public getAll(): Planet[] {
        return Object.values(this.data);
    }

    public insert(planet: Planet): Planet {
        planet.id = this.currentId;
        this.data[this.currentId] = planet;
        this.currentId++;
        return planet;
    }

    public clear() {
        // TODO: Raise exception if ENV is not test
        this.data = {};
        this.currentId = 0;
    }
}