const Manager = require("../lib/Manager");

test("Can set office number via constructor argument", () => {
  const testValue = 300;
  const e = new Manager("Josh", 1, "test@test.com", testValue);
  expect(e.office).toBe(testValue);
});

test("getRole() should return \"Manager\"", () => {
  const testValue = "Manager";
  const e = new Manager("Josh", 1, "test@test.com", "300");
  expect(e.getRole()).toBe(testValue);
});

test("Can get office number via getOffice()", () => {
  const testValue = "300";
  const e = new Manager("Josh", 1, "test@test.com", testValue)
  expect(e.getOffice()).toBe(testValue);
});