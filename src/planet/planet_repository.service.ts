import { Inject, Injectable } from "@nestjs/common";
import { Planet } from "./planet.model";
import { PLANET_DATA_STORAGE, IPlanetDataStorage } from "./planet_data_storage.service";

@Injectable()
export class PlanetRepository {
    constructor(@Inject(PLANET_DATA_STORAGE) private dataStorage: IPlanetDataStorage) {}

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
