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
  setScripts(pm);
};

export const setScripts = (pm) => {
  execSync(
    `${pm} pkg set lint-staged='{"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]}'`,
    `${pm} pkg set scripts.prepare='husky'`,
    `${pm} pkg set scripts.commitlint='commitlint --edit'`,
    `${pm} pkg set scripts.format='prettier --write'`,
    `${pm} pkg set scripts.lint='eslint ./src --fix'`,

    `${pm}x husky install`,
    `${pm}x husky add .husky/pre-commit '${pm}x lint-staged'`,
    `${pm}x husky add .husky/pre-push '${pm} test'`,
    `${pm}x husky add .husky/commit-msg '${pm} run commitlint ${1}'`,
  );
};
