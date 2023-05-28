import UniqueEntityId from "../value-objects/unique-entity-id";
import Entity from "./entity";
import { validate } from "uuid";

class StubEntity extends Entity<{ prop1: string; props2: number }> {}
describe("Entity unit tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "prop1", props2: 2 };
    const entity = new StubEntity(arrange);
    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(validate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const arrange = { prop1: "prop1", props2: 2 };
    const id = new UniqueEntityId();
    const entity = new StubEntity(arrange, id);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(id.value);
  });

  it("should convert an entity to json", () => {
    const arrange = { prop1: "prop1", props2: 2 };
    const id = new UniqueEntityId();
    const entity = new StubEntity(arrange, id);

    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    });
  });
});
