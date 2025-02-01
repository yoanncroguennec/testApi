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
  const userIp = req.ip;
  // console.log(userIp);
  res.send(userIp);
  // return res.json({ userIp });
});

// AUTH
app.use("/api/auth/patients", require("../server/routes/auth/Auth.Patients.Routes"));
app.use(
  "/api/auth/hospitalClinic",
  require("../server/routes/auth/Auth.HospitalClinic.Routes")
);

// OTHERS
app.use("/api/weeklyMenus", require("../server/routes/WeeklyMenus.Routes"));
app.use("/api/patients", require("../server/routes/Patients.Routes"));
app.use(
  "/api/hospitalClinic",
  require("../server/routes/HospitalClinic.Routes")
);

// ROUTES UNDEFINED
app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

module.exports = app;
