import { Injectable } from "@nestjs/common";
import { Planet } from "./planet.model";

export interface IPlanetDataStorage {
    getAll(): Planet[];
    insert(planet: Planet): Planet;
    clear(): void;
}

export const PLANET_DATA_STORAGE = "IN MEMORY PLANET DATA STORAGE";

@Injectable()
export class InMemoryPlanetDataStorage implements IPlanetDataStorage {
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
