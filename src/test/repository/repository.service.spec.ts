import { InMemoryRepository } from "../../repository/repository.service";

class Entity {
    constructor(public id: number, public data: number) {}
}

describe("InMemoryRepository", () => {
    const repository = new InMemoryRepository<Entity>();
    beforeEach(async () => {
        repository.clear();
    });

    it("Can add an entity", () => {
        const entity = new Entity(0, 5);
        repository.insert(entity);
        expect(repository.getAll()).toStrictEqual([entity]);
    });

    it("Can get all entities", () => {
        populateRepository(repository);
        const entity1 = new Entity(0, 5);
        const entity2 = new Entity(1, 10);
        expect(repository.getAll()).toStrictEqual([entity1, entity2]);
    });

    it("Can get an entity by ID", () => {
        populateRepository(repository);

        const newEntity = new Entity(1, 10);
        expect(repository.get(1)).toStrictEqual(newEntity);
    });

    test("Can update an entity by ID", () => {
        populateRepository(repository);
        const updatedEntity = new Entity(null, 150);
        repository.update(1, updatedEntity);
        expect(repository.get(1)).toStrictEqual(updatedEntity);
    });

    test("Can delete an entity by ID", () => {
        populateRepository(repository);
        repository.delete(1);

        const remainingEntity = new Entity(0, 5);
        expect(repository.getAll()).toStrictEqual([remainingEntity]);
    });
});

const populateRepository = function(repository: InMemoryRepository<Entity>) {
    const entity1 = new Entity(0, 5);
    const entity2 = new Entity(1, 10);
    repository.insert(entity1);
    repository.insert(entity2);
}