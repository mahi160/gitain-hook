import inquirer from "inquirer";
import ora from "ora";
import pc from "picocolors";

const PKGS =
  "husky lint-staged prettier eslint @antfu/eslint-config @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh @commitlint/{cli,config-conventional}";

export const installDependencies = async (pm) => {
  const cmd = pm === "npm" ? "install --save-dev" : "add -D";
  const installCmd = `${pm} ${cmd} --save-dev ${PKGS}`;

  console.log(pc.green(`Installing dependencies with ${pm}...`));
  console.log("Command: " + pc.cyan(installCmd));
  const install = await inquirer.prompt({
    type: "confirm",
    name: "install",
    message: "Do you want to install the dependencies?",
    default: true,
  });
  if (!install.install) return;

  const spinner = ora({ text: "Installing dependencies..." }).start();
  execSync(installCmd);
  spinner.succeed("Dependencies installed successfully!");
};
