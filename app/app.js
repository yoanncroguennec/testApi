const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.set("trust proxy", true);
app.use(cors());

// Routes
app.get("/", (req, res) => {
  // res.json("Bienvenue sur l'API");
  // // res.status(300).json({ message: "Bienvenue sur l'API" });
  const userIp = req.ip
  // console.log(userIp);
  res.send(userIp);
  // return res.json({ userIp });
});
app.use("/api/movies", require("../server/routes/Movies.Routes"));
app.use("/api/auth", require("../server/routes/Auth.Routes"));
app.use("/api/users", require("../server/routes/Users.Routes"));
app.use("/api/categoryListMovie", require("../server/routes/CategoryMovie.Routes"));

// ROUTES UNDEFINED
app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

module.exports = app;


// A REVOIR CAR DISFONCTIONNE
// const satelize = require("satelize");

// const arr = [
//   { UserId: 19156, createdAt: "2014-03-01T18:30:00.000Z" },
//   { UserId: 19150, createdAt: "2014-03-09T18:30:00.000Z" },
//   { UserId: 18459, createdAt: "2014-04-09T18:30:00.000Z" },
//   { UserId: 19666, createdAt: "2014-10-24T07:12:05.000Z" },
// ];

// satelize.satelize({ ip: "80.215.250.245"}, function(err, playload){
//   console.log("playload : ", playload);
//   res.send(playload);
// })
// app.get("/", (req, res) => {
  // let distict_dates = [...new Set(arr.map((a) => a.createdAt.substring(0, 7)))];
  // //count each date frequency
  // let reduced = distict_dates.map((a) => {
  //   return {
  //     userCount: arr.filter((a1) => a1.createdAt.startsWith(a)).length,
  //     createdAt: a,
  //   };
  // });
  // console.log(reduced);
  // res.send(reduced);
// });
