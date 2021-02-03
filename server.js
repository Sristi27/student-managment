const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

mongoose.connect(
    process.env.MONGODB_URI || "mongodb+srv://sristi27:wXvaTrnWnqVmru2z@cluster0.vv4y7.mongodb.net/<dbname>?retryWrites=true&w=majority",
    // 'mongodb://localhost/studentsdb',
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "students" },
    (err) => {
        if (!err) {
            console.log("Database connected");
        } else {
            console.log(err);
        }
    }
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));



app.use(morgan("dev"));

// app.use(express.static(path.join(__dirname, 'public')));

app.use("/students", require("./routes/student"));
app.use("/auth", require("./routes/auth"));
app.use("/notif",require("./routes/notif"));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
