import ValueObject from "../value-objects";

class StubValueObject extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("should be defined", () => {
    let stub = new StubValueObject("string value");
    expect(stub.value).toBe("string value");

    stub = new StubValueObject({ prop: "value1" });
    expect(stub.value).toStrictEqual({ prop: "value1" });
  });

  it("should convert to string", () => {
    const date = new Date();
    let arrange = [
      { received: null, expected: "null" },
      { received: undefined, expected: "undefined" },
      { received: 1, expected: "1" },
      { received: "string value", expected: "string value" },
      {
        received: { prop: "value1" },
        expected: JSON.stringify({ prop: "value1" }),
      },
      { received: date, expected: date.toString() },
    ];

    arrange.forEach((value) => {
      let stub = new StubValueObject(value.received);
      expect(stub + "").toBe(value.expected);
    });
  });
});
