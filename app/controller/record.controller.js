const Record = require("../models/record.model");

exports.create = async (req, res) => {
  try {
    const record = new Record(req.body);
    const newRecord = await record.save();
    res.status(201).send(newRecord);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Record.findByIdAndDelete(id);
    if (deleted) {
      return res
        .status(200)
        .json({ success: true, message: "Record deleted." });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Deletion failed" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const updated = await Record.findByIdAndUpdate(id, req.body);
    if (updated) {
      return res
        .status(200)
        .json({ success: true, message: "Record updated", note: updated });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Updation failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const userId = req.params.userId;
    // const records = await Record.find({ userId: userId });
    const records = await Record.find();
    res.status(200).json({ success: true, records: records });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
