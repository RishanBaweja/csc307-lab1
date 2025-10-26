import mut from "./module.js"; // MUT = Module Under Test

test("Testing sum -- success", () => {
  const expected_1 = 30;
  const got_1 = mut.sum(12, 18);
  expect(got_1).toBe(expected_1);

  const expected_2 = -6;
  const got_2 = mut.sum(12, -18);
  expect(got_2).toBe(expected_2);

  const expected_3 = -30;
  const got_3 = mut.sum(-12, -18);
  expect(got_3).toBe(expected_3);

  const expected_4 = 6;
  const got_4 = mut.sum(-12, 18);
  expect(got_4).toBe(expected_4);
});

// These are a bit redundant but I just want to learn the syntax
test("Testing sum -- failure", () => {
  const expected_1 = 31;
  const got_1 = mut.sum(12, 18);
  expect(expected_1).not.toBe(got_1);

  const expected_2 = 6;
  const got_2 = mut.sum(12, -18);
  expect(got_2).not.toBe(expected_2);

  const expected_3 = 30;
  const got_3 = mut.sum(-12, -18);
  expect(got_3).not.toBe(expected_3);

  const expected_4 = -6;
  const got_4 = mut.sum(-12, 18);
  expect(got_4).not.toBe(expected_4);
});

test("Testing div -- success", () => {
  const expected_1 = 6;
  const got_1 = mut.div(30, 5);
  expect(got_1).toBe(expected_1);

  const expected_2 = -6;
  const got_2 = mut.div(-30, 5);
  expect(got_2).toBe(expected_2);

  const expected_3 = -5;
  const got_3 = mut.div(30, -6);
  expect(got_3).toBe(expected_3);

  const expected_4 = 0.75;
  const got_4 = mut.div(3, 4);
  expect(got_4).toBe(expected_4);

  //probably should throw an error
  expect(() => mut.div(10, 0)).not.toThrow();
});

test("Testing contains Numbers (Numbers Case)-- success", () => {
  // These all should return True
  expect(mut.containsNumbers("5a5")).toBeTruthy();
  expect(mut.containsNumbers("a5")).toBeTruthy();
  expect(mut.containsNumbers("5")).toBeTruthy();
  expect(mut.containsNumbers("aaaaaa5aaaaa")).toBeTruthy();
});

test("Testing contains Numbers (Words Case)-- success", () => {
  // These all should return return False
  expect(mut.containsNumbers("hello")).toBeFalsy();
  expect(mut.containsNumbers("")).toBeFalsy();
  expect(mut.containsNumbers("a")).toBeFalsy();
});

test.failing("Testing contains Numbers -- error", () => {
  // These all should return return False but do not because of the space
  expect(mut.containsNumbers(" ")).toBeFalsy();
  expect(mut.containsNumbers("hello world")).toBeFalsy();
});
