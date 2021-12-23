const express = require("express");
const router = express.Router();
const notesModel = require("../model/notesSchema");
const noteArr = [];

router.get("/allNotes", async (req, res) => {
  try {
    let data = await notesModel.find();
    res.send({ message: "fetched", result: data });
  } catch (ex) {
    console.log(ex);
    res.status(403).send(ex.message);
  }
});

router.post("/postNote", async (req, res) => {
  try {
    let data = req.body;
    let noteObj = new notesModel();
    noteObj.id = `ID${Date.now().toString(8)}`;
    noteObj.title = data.title;
    noteObj.date = new Date();
    noteObj.computedDate = noteObj.date.toLocaleString();
    noteObj.content = data.content;
    noteObj.updatedAt = undefined;
    noteObj.createdAt = new Date();
    noteObj.readonly = true;

    noteObj.save();
    res.send({ result: noteObj });
  } catch (ex) {
    console.log(ex);
    res.status(403).send(ex.message);
  }
});

router.put("/updateNote/:id", async (req, res) => {
  try {
    let noteId = req.params.id;

    let data = await notesModel.findOne({ id: noteId });

    data.title = req.body.title;
    data.content = req.body.content;
    data.updatedAt = new Date();

    await data.save();

    res.send({ result: data });
  } catch (ex) {
    console.log(ex);
    res.status(403).send(ex.message);
  }
});

router.delete("/deleteNote/:id", async (req, res) => {
  try {
    let data = await notesModel.findOneAndDelete(req.params.id);

    res.send({ result: data });
  } catch (ex) {
    console.log(ex);
    res.status(403).send(ex.message);
  }
});

module.exports = router;
