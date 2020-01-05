const { concat, hardline, indent, join } = require("prettier").doc.builders;

const printAttributes = attributes => {
  return indent(
    join(
      hardline,
      attributes.map(attribute => printAttribute(attribute))
    )
  );
};

const printAttribute = ({ key, value }) => {
  return concat([key, "=", '"', value, '"', " "]);
};

const getOpeningTab = (tagName, attributes) => {
  if (attributes.length === 0) {
    return concat(["<", tagName, ">"]);
  }
  return concat([
    "<",
    tagName,
    indent(hardline),
    printAttributes(attributes),
    hardline,
    ">"
  ]);
};

const getClosingTag = tagName => {
  return `</${tagName}>`;
};

const printSelfClosingTag = (tagName, attributes) => {
  return concat([
    "<",
    tagName,
    indent(hardline),
    printAttributes(attributes),
    hardline,
    "/>"
  ]);
};

const getTagName = (ns, name) => {
  if (ns) {
    return `${ns}:${name}`;
  }
  return `${name}`;
};

const genericPrint = (path, opts, print) => {
  let value;
  if (path.getValue) {
    value = path.getValue();
  }
  const type = value.type || "XMLElement";

  switch (type) {
    case "XMLDocument":
      return concat([path.call(print, "rootElement"), hardline]);
    case "XMLAttribute":
      return printAttribute(value);
    case "XMLElement":
      const { ns, name, attributes, subElements } = path.getValue();

      const tagName = getTagName(ns, name);
      if (subElements.length == 0) {
        return printSelfClosingTag(tagName, attributes);
      }

      const openingTag = getOpeningTab(tagName, attributes);
      const closingTag = getClosingTag(tagName);

      let inner;
      if (subElements.length === 0) {
        inner = hardline;
      } else {
        inner = concat([
          indent(
            concat([hardline, join(hardline, path.map(print, "subElements"))])
          ),
          hardline
        ]);
      }
      return concat([openingTag, inner, closingTag]);
  }
};

module.exports = genericPrint;
