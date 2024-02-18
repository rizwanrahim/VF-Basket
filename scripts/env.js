const { execSync } = require('child_process');

try {

  const secret = execSync(`echo ${process.env.PROJECT_ID} | sed 's/./& /g'`).trim();
  console.log(secret);

} catch (error) {
  console.log(error);
}