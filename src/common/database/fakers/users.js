const { map } = require("lodash");
const { faker } = require("@faker-js/faker");

module.exports = () => {
  const users = map([...Array(10)], (user) => ({
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.street(),
    postcode: faker.address.zipCode(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(8),
    permissionFlags: faker.datatype.number({
      min: 1,
      max: 2,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return users;
};
