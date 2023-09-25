import { Inject, Injectable } from "@nestjs/common";
import { Character } from "./character.model";
import { IRepository } from "../repository/repository.service";

export const CHARACTER_REPOSITORY = "CHARACTER REPOSITORY";

@Injectable()
export class CharacterService {
    constructor(@Inject(CHARACTER_REPOSITORY) private repository: IRepository<Character>) {}

    public getAll(): Character[] {
        return this.repository.getAll();
    }

    public get(id: number): Character {
        return this.repository.get(id);
    }

    public insert(character: Character): Character {
        return this.repository.insert(character);
    }

    public update(id: number, updatedCharacter: Character): Character {
        return this.repository.update(id, updatedCharacter);
    }

    public delete(id: number): Character {
        return this.repository.delete(id);
    }
}
