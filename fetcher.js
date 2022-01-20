const request = require('request');
const readline = require('readline');
const fs = require('fs');
const url = process.argv[2];
const dest = process.argv[3];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeFile = (dest, content) => {
  fs.writeFile(dest, content, err => {
    if (err) {
      console.error(err)
      return;
    }
    console.log(`Wrote ${content.length} bytes to ${dest}`)
    process.exit(1)
  });
}

const checkIfFileExists = (dir, content) => {
  if (fs.existsSync(dir)) {

    rl.question('File exists! Do you want to overwrite? [Y/N]\n', answer => {
      if (answer !== 'n' && answer !== 'y') checkIfFileExists(dir, content);

      if (answer === 'y') {
        writeFile(dir, content);
      } else {
        console.log('Aborting!');
        process.exit(1);
      }
    })
  } else writeFile(dir, content);
};

request(url, (error, response, body) => {
  if (error !== null) {
    console.log(url,': Is not a valid URL');
    return;
  }
  checkIfFileExists(dest, body);
});