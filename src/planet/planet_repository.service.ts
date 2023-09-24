import { Injectable } from "@nestjs/common";
import { Planet } from "./planet.model";

export interface IPlanetRepository {
    getAll(): Planet[];
    get(id: number): Planet;
    insert(planet: Planet): Planet;
    update(id: number, planet: Planet): Planet;
    delete(id: number): Planet
}

@Injectable()
export class InMemoryPlanetRepository implements IPlanetRepository {
    private data: {[key: number]: Planet} = {};
    private currentId = 0;

    public getAll(): Planet[] {
        return Object.values(this.data);
    }

    public get(id: number): Planet {
        return this.data[id];
    }

    public insert(planet: Planet): Planet {
        planet.id = this.currentId;
        this.data[this.currentId] = planet;
        this.currentId++;
        return planet;
    }

    public update(id: number, updatedPlanet: Planet): Planet {
        updatedPlanet.id = id;
        this.data[id] = updatedPlanet;
        return updatedPlanet;
    }

    public delete(id: number): Planet {
        const entity = this.data[id];
        delete this.data[id];
        return entity;
    }

    public clear() {
        this.data = {};
        this.currentId = 0;
    }
}
