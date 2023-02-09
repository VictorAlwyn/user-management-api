const path = require("path");

module.exports = (fixtureURI) => {
  const fixturePath = path.resolve(`src/common/database/fakers`, fixtureURI);

  const Fixture = require(fixturePath);
  return Fixture();
};
