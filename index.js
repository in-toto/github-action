const core = require("@actions/core");
const exec = require("@actions/exec");
const childProcess = require("child_process");
const process = require("process");
const fs = require("fs");

async function run() {
  const stepName = core.getInput("step-name");
  const command = core.getInput("command");
  const key = core.getInput("private-key");

  const products = core.getInput("products");
  const exclude = core.getInput("exclude");

  //write key to tmp file
  const tmpDir = process.env["RUNNER_TEMP"];
  const keyPath = `${tmpDir}/key.pem`;

  const metadataDir = `${tmpDir}/meta`;

  //make dir

  //create buffer
  const buffer = Buffer.from(key);

  //write buffer to file
  fs.writeFileSync(keyPath, buffer);

  const binary = "in-toto-golang";
  const mainScript = `${__dirname}/${binary} run`;

  const runnerDir = process.env["GITHUB_WORKSPACE"];

  //make meta data dir
  fs.mkdirSync(metadataDir);

  const cmd = [
    mainScript,
    "-n=" + stepName,
    "-k=" + keyPath,
    "-r=" + runnerDir,
    "-d=" + metadataDir,
    "-p=" + products,
    "-m=" + runnerDir,
    "-l=" + runnerDir,
    "-e=" + exclude,
    "--",
    command,
  ];
  cmdJoined = cmd.join(" ");
  core.info("Running command: " + cmdJoined);

  //change working directory to the root of the repo
  process.chdir(process.env.GITHUB_WORKSPACE);

  exec.exec(cmdJoined);


  core.setOutput("link-metadata-dir", metadataDir);
}

run();
