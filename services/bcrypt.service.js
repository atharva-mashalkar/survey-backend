const bcrypt = require('bcryptjs');

module.exports = {
  password: (pass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
  },
  comparePassword: (password, hash) => (
    bcrypt.compareSync(password, hash)
  ),
};
