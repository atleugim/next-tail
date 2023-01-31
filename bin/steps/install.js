import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";
import {
  error,
  getPackageRoot,
  getProjectRoot,
  primary,
  success,
} from "../utils.js";

export default async function (projectName) {
  // project directories
  const projectDir = getProjectRoot(projectName);
  const packageDir = getPackageRoot();

  // template directories
  const jsSrcDir = path.join(packageDir, "template/with-javascript");
  const tsSrcDir = path.join(packageDir, "template/with-typescript");

  const spinner = ora().start();

  // check if project directory exists
  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      if (projectName !== ".")
        spinner.info(
          `${chalk.cyan.bold(projectName)} exists but is empty, continuing...\n`
        );
    } else {
      spinner.stopAndPersist();
      const { overwriteDir } = await inquirer.prompt({
        name: "overwriteDir",
        type: "list",
        message: `${chalk.hex(error).bold("Warning:")} ${chalk
          .hex(primary)
          .bold(
            projectName
          )} already exists and isn't empty. How would you like to proceed?`,
        choices: [
          {
            name: "Abort installation (recommended)",
            value: "abort",
            short: "Abort",
          },
          {
            name: "Clear the directory and continue installation",
            value: "clear",
            short: "Clear",
          },
          {
            name: "Continue installation and overwrite conflicting files",
            value: "overwrite",
            short: "Overwrite",
          },
        ],
        default: "abort",
      });

      if (overwriteDir === "abort") {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      const overwriteAction =
        overwriteDir === "clear"
          ? "clear the directory"
          : "overwrite conflicting files";

      const { confirmOverwriteDir } = await inquirer.prompt({
        name: "confirmOverwriteDir",
        type: "confirm",
        message: `Are you sure you want to ${overwriteAction}?`,
        default: false,
      });

      if (!confirmOverwriteDir) {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      if (overwriteDir === "clear") {
        spinner.info(
          `Emptying ${chalk.cyan.bold(projectName)} and creating t3 app..\n`
        );
        fs.emptyDirSync(projectDir);
      }
    }
  }

  spinner.stopAndPersist();

  const { useTypescript } = await inquirer.prompt([
    {
      name: "useTypescript",
      type: "confirm",
      message: "Do you want to use Typescript?",
    },
  ]);

  spinner.start();

  // copy template files
  if (useTypescript) {
    fs.copySync(tsSrcDir, projectDir);
  } else {
    fs.copySync(jsSrcDir, projectDir);
  }

  const scaffoldedName =
    projectName === "." ? "App" : chalk.hex(primary).bold(projectName);

  spinner.succeed(
    `${scaffoldedName} ${chalk.hex(success)("created successfully!")}\n`
  );
}
