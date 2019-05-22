const fs = require('fs');
const argv = require('yargs').argv;

const environment = argv.environment ? `.${argv.environment}` : '';

const targetPath = `./src/environments/environment${environment}.ts`;

fs.readFile(targetPath, 'utf8', function(readError, data) {
  if (readError) {
    return console.log(readError);
  }
  let result = data;

  if (process.env.BUCKET) {
    console.log('Updating BUCKET');

    result = result.replace(/(bucket_slug:\s*')(.*)(',)/g, `$1${process.env.BUCKET}$3`);
  }
  if (process.env.READ_KEY) {
    console.log('Updating READ_KEY');

    result = result.replace(/(read_key:\s*')(.*)(',)/g, `$1${process.env.READ_KEY}$3`);
  }
  if (process.env.WRITE_KEY) {
    console.log('Updating WRITE_KEY');

    result = result.replace(/(write_key:\s*')(.*)(',)/g, `$1${process.env.WRITE_KEY}$3`);
  }
  if (process.env.CMS_URL) {
    console.log('Updating CMS_URL');

    result = result.replace(/(cms_url:\s*')(.*)(',)/g, `$1${process.env.CMS_URL}$3`);
  }
  if (process.env.PRESETS) {
    console.log('Updating PRESETS');

    result = result.replace(/(presets:\s*')(.*)(',)/g, `$1${process.env.PRESETS}$3`);
  }
  if (process.env.GCP_SEND_MAIL) {
    console.log('Updating GCP_SEND_MAIL');

    result = result.replace(/(gcp_send_mail:\s*')(.*)(',)/g, `$1${process.env.GCP_SEND_MAIL}$3`);
  }

  fs.writeFile(targetPath, result, 'utf8', function(writeError) {
    if (writeError) {
      return console.log(writeError);
    }
  });
});
