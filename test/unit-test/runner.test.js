const prettier = require("prettier");
const { readFileSync, readdirSync } = require("fs");

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const testFolders = getDirectories("test/unit-test");

describe("Running test against sample input/output", () => {
  for (let i = 0; i < testFolders.length; i++) {
    let testFolder = testFolders[i];
    test(testFolder, () => {
      const inputContent = readFileSync(
        `test/unit-test/${testFolder}/input.xml`,
        "utf-8"
      );
      const outputContent = readFileSync(
        `test/unit-test/${testFolder}/output.xml`,
        "utf-8"
      );
      const formatted = prettier.format(inputContent, {
        parser: "xml",
        plugins: ["."]
      });
      expect(formatted).toBe(outputContent);
    });
  }
});
