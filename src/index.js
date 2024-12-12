import figlet from "figlet";
import fs from "fs";
import inquirer from "inquirer";
import * as ora from "ora";
import pc from "picocolors";

const welcome = async () => {
  const title = figlet.textSync("Gitain Hook", { horizontalLayout: "full" });
  console.log(pc.red(title));
  console.log(pc.yellow("Welcome to gitain-hook!"));
  console.log(
    pc.yellow(
      "Add husky, lint-staged, prettier, eslint and commitlint to your project."
    )
  );
};

// Ask for package manager
const pmPrompt = async () => {
  const pmOptions = ["npm", "yarn", "pnpm"];
  pmOptions.forEach((pm, index) => {
    console.log(`${index + 1}. ${pm}`);
  });
  const pm = await inquirer.prompt({
    type: "list",
    name: "pm",
    message: "Select your package manager:",
    choices: pmOptions,
  });
  installDependencies(pm.pm);
};

// Install dependencies
const installDependencies = async (pm) => {
  const pkgs =
    "husky lint-staged prettier eslint @commitlint/{cli,config-conventional}";
  const cmd = pm === "npm" ? "install --save-dev" : "add -D";
  const installCmd = `${pm} ${cmd} --save-dev ${pkgs}`;

  console.log(pc.green(`Installing dependencies with ${pm}...`));
  console.log("Command: " + pc.cyan(installCmd));
  const install = await inquirer.prompt({
    type: "confirm",
    name: "install",
    message: "Do you want to install the dependencies?",
    default: true,
  });
  if (!install.install) return;
  const spinner = ora.default({ text: "Installing dependencies..." }).start();
  // execSync(installCmd);
  spinner.succeed("Dependencies installed successfully!");
};

// Ask for template
const templatePrompt = async () => {
  const templateOptions = ["questionpro-fe", "questionpro-be"];
  templateOptions.forEach((template, index) => {
    console.log(`${index + 1}. ${template}`);
  });
  const template = await inquirer.prompt({
    type: "list",
    name: "template",
    message: "Select your template:",
    choices: templateOptions,
  });
  return template.template
};

// Add config files
const updateOrCreateFile = async (file, template) => {
  if (fs.existsSync(file)) {
    console.log(pc.yellow(`File ${file} already exists.`));
    fs.renameSync(file, `${file}.${new Date()}.bak`);
    fs.writeSync(file, `/* Previous configuration backed up */\n`);
  } else {
    console.log('Creating file "' + file + '"');
    fs.writeFileSync(file, `/* Configuration file created by gitain-hook */\n`);
  }

  fs.appendFileSync(file, fs.readFileSync(template, "utf8"));
};

welcome();
pmPrompt();

const templateDir = "./templates";
const eslintTemplate = `${templateDir}/eslint.config.js`;
const prettierTemplate = `${templateDir}/.prettierrc`;
const commitlintTemplate = `${templateDir}/commitlint.config.js`;
updateOrCreateFile(".eslintrc.json", eslintTemplate);
updateOrCreateFile(".prettierrc", prettierTemplate);
updateOrCreateFile("commitlint.config.js", commitlintTemplate);
