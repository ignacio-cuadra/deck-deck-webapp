import handlebars from "handlebars";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatePath = resolve(__dirname, "email.template.html");
const emailTemplate = handlebars.compile(readFileSync(templatePath, "utf8"));

export default emailTemplate;
