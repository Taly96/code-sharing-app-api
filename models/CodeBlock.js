const mongoose = require("mongoose");

const codeBlockSchema = new mongoose.Schema(
  {
    _id: { typeof: String },
    title: String,
    code: String,
  },
  { collection: "code_blocks" }
);

const CodeBlock = mongoose.model("CodeBlock", codeBlockSchema);

module.exports = CodeBlock;
