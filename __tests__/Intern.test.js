const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
  const testValue = "NCSSM";
  const e = new Intern("Josh", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Josh", 1, "test@test.com", "NCSSM");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "NCSSM";
  const e = new Intern("Josh", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});