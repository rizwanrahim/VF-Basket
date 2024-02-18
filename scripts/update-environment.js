const fs = require('fs');

const replacements = {
  GITHUB_PROJECT_ID: process.env.PROJECT_ID || '',
  GITHUB_APP_ID: process.env.APP_ID || '',
  GITHUB_STORAGE_BUCKET: process.env.STORAGE_BUCKET || '',
  GITHUB_API_KEY: process.env.API_KEY || '',
  GITHUB_AUTH_DOMAIN: process.env.AUTH_DOMAIN || '',
  GITHUB_MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID || '',
  GITHUB_MEASUREMENT_ID: process.env.MEASUREMENT_ID || '',
};

const filePath = 'src/environments/environment.ts';

const content = fs.readFileSync(filePath, 'utf8');

const updatedContent = Object.entries(replacements).reduce(
  (acc, [placeholder, value]) => acc.replace(new RegExp(placeholder, 'g'), value),
  content
);

fs.writeFileSync(filePath, updatedContent, 'utf8');

// Set outputs to make values available for subsequent steps
Object.entries(replacements).forEach(([key, value]) => {
  console.log(`::set-output name=${key}::${value}`);
});

console.log('environment.ts file updated successfully.');