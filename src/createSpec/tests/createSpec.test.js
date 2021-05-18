import createSpec from "..";
import faker from "../../faker";

test("Returns false if argument is invalid", () => {
  expect(() => {
    createSpec();
  }).toThrow();
  expect(() => {
    createSpec(true);
  }).toThrow();
  expect(() => {
    createSpec("firstName");
  }).toThrow();
  expect(() => {
    createSpec(32);
  }).toThrow();
  expect(() => {
    createSpec([]);
  }).toThrow();
  expect(() => {
    createSpec(["firstName"]);
  }).toThrow();
});

test("Generates a simple Spec", () => {
  const Spec = createSpec({
    name: faker.name.firstName(),
  });
  const fixture = Spec.generate();

  expect(typeof fixture.name).toBe("string");
});

test("Generates a Spec with multiple keys", () => {
  const Spec = createSpec({
    firstName: faker.name.firstName(),
    lastName: faker.name.firstName(),
    id: faker.datatype.number(),
    company: {
      name: faker.company.companyName(),
    },
    location: {
      address: faker.address.streetAddress(),
      country: faker.address.country(),
      city: faker.address.city(),
    },
  });
  const fixture = Spec.generate();

  expect(typeof fixture.firstName).toBe("string");
  expect(typeof fixture.lastName).toBe("string");
  expect(typeof fixture.id).toBe("number");
  expect(typeof fixture.company.name).toBe("string");
  expect(typeof fixture.location.address).toBe("string");
  expect(typeof fixture.location.country).toBe("string");
  expect(typeof fixture.location.city).toBe("string");
});

test("Can generate nested Specs", () => {
  const MessageSpec = createSpec({
    id: faker.datatype.number(),
    read: faker.datatype.boolean(),
    timestamp: faker.date.past(),
    message: faker.lorem.paragraph(),
  });

  const ConvoSpec = createSpec({
    from: {
      name: faker.name.firstName(),
      email: faker.internet.email(),
    },
    to: {
      name: faker.name.firstName(),
      email: faker.internet.email(),
    },
    messages: MessageSpec.generate(5),
  });

  const fixture = ConvoSpec.generate();

  expect(typeof fixture.from).toBe("object");
  expect(typeof fixture.from.name).toBe("string");
  expect(typeof fixture.from.email).toBe("string");
  expect(typeof fixture.to).toBe("object");
  expect(typeof fixture.to.name).toBe("string");
  expect(typeof fixture.to.email).toBe("string");
  expect(Array.isArray(fixture.messages)).toBeTruthy();
  expect(fixture.messages.length).toBe(5);
  expect(typeof fixture.messages[0].id).toBe("number");
  expect(typeof fixture.messages[0].message).toBe("string");
});
