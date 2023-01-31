import path from "path";
import terminalLink from "terminal-link";
import { fileURLToPath } from "url";

// colors
export const primary = "#38E9F9";
export const success = "#6FD667";
export const error = "#ff3333";
export const warning = "#ff9900";
export const muted = "#ABB2BF";

export const link = terminalLink("@atleugim", "https://atleugim.vercel.app/");

export const getPackageRoot = () => {
  const __filename = fileURLToPath(import.meta.url);
  const distPath = path.dirname(__filename);
  return path.join(distPath, "../");
};

export const getProjectRoot = (name) => {
  return path.resolve(process.cwd(), name);
};
