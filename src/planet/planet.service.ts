import { Inject, Injectable } from "@nestjs/common";
import { Planet } from "./planet.model";
import { IRepository } from "src/repository/repository.service";

export const PLANET_REPOSITORY = "PLANET REPOSITORY";

@Injectable()
export class PlanetService {
    constructor(@Inject(PLANET_REPOSITORY) private repository: IRepository<Planet>) {}

    public getAll(): Planet[] {
        return this.repository.getAll();
    }

    public get(id: number): Planet {
        return this.repository.get(id);
    }

    public insert(planet: Planet): Planet {
        return this.repository.insert(planet);
    }

    public update(id: number, updatedPlanet: Planet): Planet {
        return this.repository.update(id, updatedPlanet);
    }

    public delete(id: number): Planet {
        return this.repository.delete(id);
    }
}
