import ValueObject from "../value-objects";

class StubValueObject extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("should be defined", () => {
    let stub = new StubValueObject("string value");
    expect(stub.value).toBe("string value");

    stub = new StubValueObject({ prop: "value1" });
    expect(stub.value).toStrictEqual({ prop: "value1" });
  });
});
