import inquirer from "inquirer";

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