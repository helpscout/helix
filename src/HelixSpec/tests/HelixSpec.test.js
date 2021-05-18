import { times } from "lodash";
import HelixSpec from "..";
import faker from "../../faker";
import ExternalTestSpec from "./ExternalTestSpec.fixture";

describe("External", () => {
  test("Can load external test spec", () => {
    const fixture = ExternalTestSpec.generate();

    expect(typeof fixture.id).toBe("number");
    expect(typeof fixture.fname).toBe("string");
    expect(typeof fixture.lname).toBe("string");
  });

  test("Can nest external spec", () => {
    const NestedSpec = new HelixSpec({
      external: ExternalTestSpec,
    });

    const fixture = NestedSpec.generate().external;

    expect(typeof fixture.id).toBe("number");
    expect(typeof fixture.fname).toBe("string");
    expect(typeof fixture.lname).toBe("string");
  });

  test("Can generate min -> max specs with the same seed", () => {
    const MessageSpec = new HelixSpec({
      id: faker.datatype.number(),
      read: faker.datatype.boolean(),
      timestamp: faker.date.past(),
      message: faker.lorem.paragraph(),
    });

    times(20, (index) => {
      const fixture = MessageSpec.seed(index).generate(0, 3);
      expect(Array.isArray(fixture)).toBeTruthy();
      expect(fixture.length).toBeGreaterThanOrEqual(0);
      expect(fixture.length).toBeLessThanOrEqual(3);
    });
  });

  test("Can generate computed values with seed values", () => {
    const nameProps = {
      fname: faker.name.firstName(),
      lname: faker.name.lastName(),
    };
    const PersonSpec = new HelixSpec({
      id: faker.datatype.number(),
      name: faker.computed(nameProps)((props) => {
        return `${props.fname} ${props.lname}`;
      }),
    });

    const fixture = PersonSpec.seed(2).generate();
    const fixture2 = PersonSpec.seed(2).generate();

    expect(fixture.name).toBe(fixture2.name);
  });
});
