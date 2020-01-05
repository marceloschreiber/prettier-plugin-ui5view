const parse = require("./parse");
const print = require("./print");

module.exports = {
  languages: [
    {
      name: "xml",
      parsers: ["xml"],
      extensions: [".view.xml"],
      vscodeLanguageIds: ["xml"]
    }
  ],
  parsers: {
    xml: {
      parse,
      astFormat: "xml"
    }
  },
  printers: {
    xml: {
      print
    }
  },
  options: {},
  defaultOptions: {}
};
