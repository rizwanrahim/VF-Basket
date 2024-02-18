const { execSync } = require('child_process');
const core = require('@actions/core');

try {

  const secret = execSync(`echo ${process.env.PROJECT_ID} | sed 's/ //g`).trim();
  console.log(secret);

} catch (error) {
  core.setFailed(error.message);
}