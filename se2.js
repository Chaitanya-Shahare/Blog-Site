const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0/alwaysfirst", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("Only CSV and TXT files are allowed."));
  }
};

const upload = multer({ dest: "uploads/", fileFilter: fileFilter });

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  // const fileExtension = file.originalname.split(".").pop(); // Get the file extension
  const newFileName = file.originalname;

  const reqfilePath = "uploads/" + newFileName;
  fs.rename(file.path, reqfilePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while saving the file.");
      return;
    }
  });

  const collectionName = newFileName;
  const collection = db.collection(collectionName);
  console.log(collectionName, "uploaded");

  fs.createReadStream(reqfilePath)
    .pipe(csv())
    .on("data", async (data) => {
      collection.insertOne(data, function (err, res) {
        if (err) {
          console.log("Error inserting document:", err);
        } else {
          // console.log(data);
          // console.log('Document inserted:', res.insertedId);
        }
      });
      // setSessionData('uploadedData', data.stringify);
    })
    .on("end", () => {
      console.log("CSV file successfully imported to MongoDB");
      res.sendStatus(200);
    });
});

app.get("/read", async (req, res) => {
  console.log(req.query.name, "query");
  const ritika = req.query.name;

  const data = await db.collection(ritika).find().toArray();
  // console.log(data);
  res.send(data);
});
app.delete("/delete", async (req, res) => {
  // console.log(req.body.emp_id);
  // console.log(req.query.name);
  const collection_name = req.query.name;
  const to_delete_emp_id = req.body.emp_id;
  await db.collection(collection_name).deleteOne({ emp_id: to_delete_emp_id });
  res.sendStatus(200);
  console.log("Document deleted successfully from server!");
});

app.post("/create", (req, res) => {
  const collection_name = req.query.name;
  const data = {
    _id: req.body.emp_id,
    emp_name: req.body.emp_name,
    emp_id: req.body.emp_id,
    gender_id: req.body.gender_id,
    bu_id: req.body.bu_id,
    termination_id: req.body.termination_id,
    band_id: req.body.band_id,
    band: req.body.band,
    gender: req.body.gender,
    joining_date: req.body.joining_date,
    terminate_reason: req.body.terminate_reason,
    working_status: req.body.working_status,
    bu: req.body.bu,
    manager_name: req.body.manager_name,
    manager_id: req.manager_id,
    hiring_source: req.body.hiring_source,
    division: req.body.division,
  };

  db.collection(collection_name).insertOne(data, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// app.put("/update",(req,res)=>{
//   const collection_name=req.query.name;

//             const data = { "emp_name": req.body.emp_name, "emp_id": req.body.emp_id, "gender_id": req.body.gender_id,
//             "bu_id":req.body.bu_id,"termination_id":req.body.termination_id,"band_id":req.body.band_id,"band":req.body.band,
//             "gender":req.body.gender,"joining_date":req.body.joining_date,"terminate_reason":req.body.terminate_reason,
//             "working_status":req.body.working_status,"bu":req.body.bu,"manager_name":req.body.manager_name,
//             "manager_id":req.manager_id,"hiring_source":req.body.hiring_source,"division":req.body.division};
//             db.collection(collection_name).updateOne({"emp_id":req.body.emp_id},{$set:data}, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     res.send(err);
//                 }
//                 else {
//                     res.send(result);
//                 }
//               });
// })

app.listen(3003, () => {
  console.log("Server is listening on port 3003");
});
