import inquirer from "inquirer";
import pc from "picocolors";

export const pmPrompt = async () => {
  const pmOptions = [pc.red("npm"), pc.blue("yarn"), pc.yellowBright("pnpm")];
  const pm = await inquirer.prompt({
    type: "list",
    name: "pm",
    message: "Select your package manager:",
    choices: pmOptions,
  });
  return pm.pm;
};
