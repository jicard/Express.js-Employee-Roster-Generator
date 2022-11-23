const Engineer = require("../lib/Engineer");

test("Can set Github account via constructor", () => {
  const github = "jicard";
  const e = new Engineer("Josh", 1, "test@test.com", github);
  expect(e.github).toBe(github);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const e = new Engineer("Josh", 1, "test@test.com", "jicard");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "jicard";
  const e = new Engineer("Josh", 1, "test@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});