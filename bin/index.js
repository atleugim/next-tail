#! /usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { install, intro } from "./steps/index.js";

const yarg = yargs(hideBin(process.argv));

yarg
  .scriptName("next-tail")
  .usage("\nUsage: next-tail create <name>")
  .command(
    "create [name]",
    "Create a new Next.js project with Tailwind CSS",
    (yargs) => {
      yargs.positional("name", {
        type: "string",
        default: "my-project",
        describe: "the name of your project",
      });
    },
    function (argv) {
      try {
        const projectName = argv.name;
        intro();
        install(projectName);
      } catch (err) {
        console.error(err);
      }
    }
  )
  .help().argv;
