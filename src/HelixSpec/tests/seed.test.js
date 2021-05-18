import HelixSpec from "..";
import faker from "../../faker";

test("Throws if argument is invalid", () => {
  const person = new HelixSpec({
    name: faker.name.firstName(),
  });

  expect(() => {
    person.seed();
  }).not.toThrow();
  expect(() => {
    person.seed("1");
  }).toThrow();
  expect(() => {
    person.seed(true);
  }).toThrow();
  expect(() => {
    person.seed({ value: 2 });
  }).toThrow();
});

test("Can be set", () => {
  const person = new HelixSpec({
    name: faker.name.firstName(),
  });

  const one = person.seed(1).generate();
  const two = person.seed(2).generate();
  const three = person.seed(1).generate();

  expect(typeof one.name).toBe("string");
  expect(typeof two.name).toBe("string");
  expect(typeof three.name).toBe("string");
  expect(one.name).not.toBe(two.name);
  expect(two.name).not.toBe(three.name);
  expect(one.name).toBe(three.name);
});

test("Is unaffected by external faker.seed", () => {
  const person = new HelixSpec({
    name: faker.name.firstName(),
  });

  faker.seed(4);
  const one = person.seed(1).generate();
  const two = person.seed(2).generate();
  faker.seed(3);
  const three = person.seed(1).generate();

  expect(typeof one.name).toBe("string");
  expect(typeof two.name).toBe("string");
  expect(typeof three.name).toBe("string");
  expect(one.name).not.toBe(two.name);
  expect(two.name).not.toBe(three.name);
  expect(one.name).toBe(three.name);
});

test("Can seed + generate multiple specs", () => {
  const MessageSpec = new HelixSpec({
    id: faker.datatype.number(),
    read: faker.datatype.boolean(),
    timestamp: faker.date.past(),
    message: faker.lorem.paragraph(),
  });

  const fixture = MessageSpec.seed(2).generate(5);

  expect(Array.isArray(fixture)).toBeTruthy();
  expect(fixture[0].id).not.toBe(fixture[1].id);
  expect(fixture[0].id).not.toBe(fixture[2].id);
  expect(fixture[0].id).not.toBe(fixture[3].id);
  expect(fixture[0].id).not.toBe(fixture[4].id);
});

test("Can seed + generate multiple specs with consistent seed values", () => {
  const MessageSpec = new HelixSpec({
    id: faker.datatype.number(),
  });

  const fixture = MessageSpec.seed(2).generate(5);

  faker.seed(2);
  expect(fixture[0].id).toBe(faker.datatype.number()());
  faker.seed(3);
  expect(fixture[1].id).toBe(faker.datatype.number()());
  faker.seed(4);
  expect(fixture[2].id).toBe(faker.datatype.number()());
  faker.seed(5);
  expect(fixture[3].id).toBe(faker.datatype.number()());
  faker.seed(6);
  expect(fixture[4].id).toBe(faker.datatype.number()());
});
