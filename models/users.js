mongoose = require("./../mongodb");
bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  }
});

// hashing the password before saving them into the database - Security
userSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
      return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to verify the user password
userSchema.methods.isValidPassword = async function (passwd) {
  return await bcrypt.compare(passwd, this.password);
}

module.exports = new mongoose.model("User", userSchema);