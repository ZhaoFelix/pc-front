/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-10-26 13:36:47
 * @LastEditTime: 2021-04-25 15:08:36
 * @FilePath: /pc-front/build/index.js
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
const chalk = require("chalk");
const config = require("../vue.config.js");
const rawArgv = process.argv.slice(2);
const args = rawArgv.join(" ");

if (process.env.npm_config_preview || rawArgv.includes("--preview")) {
  const report = rawArgv.includes("--report");

  run(`vue-cli-service build ${args}`);

  const port = 9526;
  const publicPath = config.publicPath;

  var connect = require("connect");
  var serveStatic = require("serve-static");
  const app = connect();

  app.use(
    publicPath,
    serveStatic("./dist", {
      index: ["index.html", "/"]
    })
  );

  app.listen(port, function() {
    console.log(
      chalk.green(`> Preview at  http://localhost:${port}${publicPath}`)
    );
    if (report) {
      console.log(
        chalk.green(
          `> Report at  http://localhost:${port}${publicPath}report.html`
        )
      );
    }
  });
} else {
  run(`vue-cli-service build ${args}`);
}
