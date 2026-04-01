const signupValidatior = (data) => {
  if (!data.name || !data.email || !data.password) {
    throw new Error("Name, email and password are required");
  }
};
const validateEditProfileData = (req) => {
  const allowedUpdates = [
    "name",
    "email",
    "age",
    "gender",
    "about",
    "photoUrl",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((key) => {
    return allowedUpdates.includes(key);
  });
  return isEditAllowed;
};
module.exports = { signupValidatior, validateEditProfileData };
