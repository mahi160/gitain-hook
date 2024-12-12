import figlet from "figlet";
import pc from "picocolors";

export const welcome = async () => {
  const title = figlet.textSync("Gitain Hook", { horizontalLayout: "full" });
  console.log(pc.red(title));
  console.log(pc.yellow("Welcome to gitain-hook!"));
  console.log(
    pc.yellow(
      "Add husky, lint-staged, prettier, eslint and commitlint to your project."
    )
  );
};