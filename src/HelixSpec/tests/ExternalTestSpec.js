import HelixSpec from '..'
import faker from '../../faker'

export default new HelixSpec({
  id: faker.random.number(),
  fname: faker.name.firstName(),
  lname: faker.name.lastName()
})
