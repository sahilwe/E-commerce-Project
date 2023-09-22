import bcrypt from "bcrypt";

export const hashPassword = async (passsword) => {
  try {
    const saltRounds = 10;
    const hashpwd = await bcrypt.hash(passsword, saltRounds);
    return hashpwd;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (passsword, hashpwd) => {
  return bcrypt.compare(passsword, hashpwd);
};
