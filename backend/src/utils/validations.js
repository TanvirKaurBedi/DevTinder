const signupValidatior = (data) => {
  console.log("data", data);
  if (!data.name || !data.email || !data.password) {
    throw new Error("Name, email and password are required");
  }
};
module.exports = { signupValidatior };
