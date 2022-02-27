const bcrypt = require('bcryptjs');

 export const encrypt = async (password) => {

  const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

export const decrypt = async (password, passwordHash) => {
  const isMatch = await bcrypt.compare(password, passwordHash);
  return isMatch;
}
