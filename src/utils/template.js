import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";

const CONFIG_FILES = {
  prettier: ".prettierrc",
  eslint: "eslint.config.js",
  commitlint: "comitlint.config.mjs",
};
export const addOrUpdateConfigFile = async (file, template) => {
  const configFileName = CONFIG_FILES[file];
  const templatePath = path.join(process.cwd(), "src", "templates", template);
  const configFilePath = path.join(templatePath, configFileName);

  if (fs.existsSync(configFileName)) {
    console.log(pc.yellow("Config file already exists. Creating a backup."));
    const backupFileName = configFileName + Date.now() + ".bak";
    fs.renameSync(configFileName, backupFileName);
  } else {
    console.log(pc.green("Creating config file."));
  }

  fs.writeFileSync(configFileName, "");
  const configFileContent = fs.readFileSync(configFilePath, {
    encoding: "utf-8",
  });
  fs.appendFileSync(configFileName, configFileContent);
};
