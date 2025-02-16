import { installDependencies } from "./utils/install.js";
import { pmPrompt } from "./utils/pacman.js";
import { addOrUpdateConfigFile } from "./utils/template.js";
import { welcome } from "./utils/welcome.js";

/**
 * - Welcome
 * - Ask for package manager
 * - Add package.json scripts
 * - Install dependencies
 * - Add husky files
 * - Create config files
 * - Cleanup
 * - Ctrl + C to exit
 */
welcome();
const pm = await pmPrompt();
await installDependencies(pm);
await addOrUpdateConfigFile("prettier", "default");
