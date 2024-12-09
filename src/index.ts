import { execSync } from "child_process";
import figlet from "figlet";
import inquirer from "inquirer";
import pc from "picocolors";

const welcome = async () => {
  const title = figlet.textSync("Gitain Hook", { horizontalLayout: "full" });
  console.log(pc.red(title));
  console.log(pc.yellow("Welcome to gitain-hook!"));
  console.log(pc.yellow("Add husky, lint-staged, prettier, eslint and commitlint to your project."));
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
  })
  installDependencies(pm.pm);
};

// Install dependencies
const installDependencies = async (pm: string) => {
  const pkgs = "husky lint-staged prettier eslint @commitlint/{cli,config-conventional}";
  const cmd = pm === "npm" ? 'install --save-dev' : 'add -D';
  const installCmd = `${pm} ${cmd} --save-dev ${pkgs}`;

  console.log(pc.green(`Installing dependencies with ${pm}...`));
  console.log(pc.cyan(installCmd));
  execSync(installCmd);
  console.log(pc.green("Dependencies installed successfully!"));
};
welcome();
pmPrompt();

