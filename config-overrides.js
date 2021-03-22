const {alias} = require('react-app-rewire-alias');

module.exports = (config) => {
  alias({
    '@Components': 'src/Components',
    '@Layouts' : 'src/Layouts',
    '@Helpers': 'src/Helpers',
    '@Store': 'src/Store',
    '@Axios': 'src/Axios',
  })(config);

  return config;
};
