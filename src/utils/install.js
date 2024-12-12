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