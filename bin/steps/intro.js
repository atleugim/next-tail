import chalk from "chalk";
import { link, muted, primary } from "../utils.js";

export default function () {
  const lines = "----------------------------------------------------";
  console.log(chalk.hex(primary).bold(lines));
  console.log(
    chalk.hex(primary).bold("NextJs & TailwindCSS Project Generator")
  );
  console.log(chalk.hex(primary).bold(`${lines}`));

  console.log(chalk.hex(muted).bold(`Created by: Miguel Vega ${link}`));
}
