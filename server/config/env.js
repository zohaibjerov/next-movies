require("dotenv").config();
module.exports = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || "asdasdsadasdasd1231231231",
};
