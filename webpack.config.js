const Dotenv = require('dotenv-webpack');
module.exports = {
  plugins: [new Dotenv()],

  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },
};

//Not too sure this is used anymore.
