import { validate } from "uuid";
import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id";

const spyValidateMethod = () => {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
};

describe("UniqueEntityId Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("fake uuid")).toThrowError(
      new InvalidUuidError()
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate uuid when constructor is empty", () => {
    const validateSpy = spyValidateMethod();

    const uniqueEntityId = new UniqueEntityId();
    expect(validate(uniqueEntityId.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
  it("should accept uuid passed on constructor", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const uuid = "ef089ea7-6956-4aa2-9fe9-0569fbb75ffe";
    const uniqueEntityId = new UniqueEntityId(uuid);
    expect(uniqueEntityId.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });
});
