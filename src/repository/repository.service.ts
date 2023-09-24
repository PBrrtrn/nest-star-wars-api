import { Injectable } from "@nestjs/common";

export interface IRepository<T> {
    getAll(): T[];
    get(id: number): T;
    insert(entity: T): T;
    update(id: number, entity: T): T;
    delete(id: number): T
}

interface Identifiable {
    id: number
}

@Injectable()
export class InMemoryRepository<T extends Identifiable> implements IRepository<T> {
    private data: {[key: number]: T} = {};
    private currentId = 0;

    public getAll(): T[] {
        return Object.values(this.data);
    }

    public get(id: number): T {
        return this.data[id];
    }

    public insert(entity: T): T {
        entity.id = this.currentId;
        this.data[this.currentId] = entity;
        this.currentId++;
        return entity;
    }

    public update(id: number, updatedEntity: T): T {
        updatedEntity.id = id;
        this.data[id] = updatedEntity;
        return updatedEntity;
    }

    public delete(id: number): T {
        const entity = this.data[id];
        delete this.data[id];
        return entity;
    }

    public clear() {
        this.data = {};
        this.currentId = 0;
    }
}
