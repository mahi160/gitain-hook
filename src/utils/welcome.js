import { execSync } from "child_process";
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
  isGitRepo();
};

// Check if the project is a git repository
const isGitRepo = () => {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      stdio: "ignore",
    });
    console.log(pc.green("Project is a git repository."));
  } catch (e) {
    console.log(pc.red("Project is not a git repository."));
    process.exit(1);
  }
};
