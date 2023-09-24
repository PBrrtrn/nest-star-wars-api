import { Injectable } from "@nestjs/common";
import { Character } from "./character.model";

export interface ICharacterRepository {
    getAll(): Character[];
    get(id: number): Character;
    insert(character: Character): Character;
    update(id: number, character: Character): Character;
    delete(id: number): Character
}

@Injectable()
export class InMemoryCharacterRepository implements ICharacterRepository {
    private data: {[key: number]: Character} = {};
    private currentId = 0;

    public getAll(): Character[] {
        return Object.values(this.data);
    }

    public get(id: number): Character {
        return this.data[id];
    }

    public insert(character: Character): Character {
        character.id = this.currentId;
        this.data[this.currentId] = character;
        this.currentId++;
        return character;
    }

    public update(id: number, updatedCharacter: Character): Character {
        updatedCharacter.id = id;
        this.data[id] = updatedCharacter;
        return updatedCharacter;
    }

    public delete(id: number): Character {
        const entity = this.data[id];
        delete this.data[id];
        return entity;
    }

    public clear() {
        this.data = {};
        this.currentId = 0;
    }
}
