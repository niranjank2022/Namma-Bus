const mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost:27017/namma-bus")
.then(() => {
    console.log("Mongodb connected!");
})
.catch(() => {
    console.log("Failed to connect!");
});

module.exports = mongoose;