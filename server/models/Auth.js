const mongoose = require("mongoose");

// {
//     "email": "test@gmail.com",
//     "username": "yoyo",
//     "newsletter": true,
//     "password": "jjjj"
// }

const UserModel = mongoose.model("User", {
  ipAddress: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: null,
    // required: "Entrez votre prénom",
  },
  lastName: {
    type: String,
    required: "Entrez votre nom de famille",
  },
  admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  email: {
    type: String,
    required: "Entrez votre email",
    unique: true,
  },
  account: {
    username: {
      type: String,
    },
    avatar: Object,
    address: {
      type: String,
      // required: true,
    },
    postalCode: {
      type: Number,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    sex: {
      type: Boolean,
      // default: undefined
      // required: true,
    },
  },
  newsletter: Boolean,
  token: String,
  hash: String,
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserModel;
