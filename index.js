const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const app = express();
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});


app.use(express.json());


mongoose.connect("mongodb+srv://niranjank:vlYB4PtiA6Z70KjM@cluster0.lsvtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to Database.");
})
.catch(() => {
    console.log("Error connecting database.");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
