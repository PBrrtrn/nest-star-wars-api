import { Inject, Injectable } from "@nestjs/common";
import { Planet } from "./planet.model";
import { IPlanetRepository } from "./planet_repository.service";

export const PLANET_REPOSITORY = "PLANET REPOSITORY"

@Injectable()
export class PlanetService {
    constructor(@Inject(PLANET_REPOSITORY) private dataStorage: IPlanetRepository) {}

    public getAll(): Planet[] {
        return this.dataStorage.getAll();
    }

    public insert(planet: Planet): Planet {
        return this.dataStorage.insert(planet);
    }

    public clear() {
        this.dataStorage.clear();
    }
}
