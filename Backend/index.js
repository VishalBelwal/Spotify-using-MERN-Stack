const express = require("express")         
const mongoose = require("mongoose")


const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require("passport")
const authRoutes = require("./routes/Auth")
const songRoutes = require("./routes/song")
const playlistRoutes = require("./routes/playlist")
const likedsongsRoutes = require("./routes/Likedsong")
const User = require("./models/User")
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const artist = require('./routes/ArtistRoute')

app.use(cors());
app.use(express.json());          //agar req.body me kuch bhi aa raha hai to use json me convert kar dena hai

// connecting MongoDB to node app
mongoose
  .connect(
    "mongodb+srv://Vishalbelwal:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.pcmria4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

//SettingUp PassPort JWT

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thiskeyissecret";

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findOne({_id: jwt_payload.identifier}).exec();
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        } catch (err) {
            return done(err, false);
        }
    })
);




//API : GET TYPE on /(slash route) return text hello world
app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use("/auth", authRoutes)
app.use("/song", songRoutes)
app.use("/playlist", playlistRoutes)
app.use("/likedsong", likedsongsRoutes)
app.use("/artist", artist)

app.listen(port, () => {
  console.log("App is running on Port "+ port);
})


