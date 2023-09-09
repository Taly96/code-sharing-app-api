const express = require("express");
const router = express.Router();
const CodeBlock = require("../models/CodeBlock");

router.get("/", async (req, res) => {
  try {
    const codeBlocks = await CodeBlock.find({});
    if (codeBlocks.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.json(codeBlocks);
    } else {
      console.log("No code blocks found.");
    }
  } catch (error) {
    console.error("Error retrieving code blocks:", error);
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const codeBlock = await CodeBlock.findOne({ _id: id });
    if (codeBlock) {
      console.log("Fetched 1 code block");
      res.setHeader("Content-Type", "application/json");
      res.json(codeBlock);
    } else {
      console.log("No code blocks found.");
    }
  } catch (error) {
    console.error("Error retrieving code blocks:", error);
  }
});

router.post("/byId/:id", async (req, res) => {
  const updateData = {
    title: req.body.title,
    code: req.body.code,
  };
  const updateOptions = {
    new: true,
  };

  await CodeBlock.findOneAndUpdate(
    { _id: req.params.id },
    updateData,
    updateOptions
  )
    .then((updatedObject) => {
      if (updatedObject) {
        console.log("Object updated successfully:", updatedObject);
      } else {
        console.log("Object not found or no changes made.");
      }
    })
    .catch((error) => {
      console.error("Error updating object:", error);
    });
});

module.exports = router;
