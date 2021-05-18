import HelixSpec from "..";
import faker from "../../faker";

// Just for testing
export default new HelixSpec({
  id: faker.datatype.number(),
  fname: faker.name.firstName(),
  lname: faker.name.lastName(),
});
