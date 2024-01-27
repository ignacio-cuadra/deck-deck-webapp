import chalk from "chalk";

export default function requestLogMiddleware(req, res, next) {
  const verbs = {
    GET: chalk.bgBlueBright.rgb(255, 255, 255).bold,
    POST: chalk.bgGreenBright.rgb(255, 255, 255).bold,
    PATCH: chalk.bgYellowBright.rgb(255, 255, 255).bold,
    DELETE: chalk.bgRedBright.rgb(255, 255, 255).bold,
  };
  const style = verbs[req.method] ?? chalk.bgGray;
  console.log(`${style(" " + req.method + " ")} ${req.url}`);
  next();
}
