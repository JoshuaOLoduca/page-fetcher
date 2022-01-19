const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const dest = process.argv[3];

const writeFile = (dest, content) => {
  fs.writeFile(dest, content, err => {
    if (err) {
      console.error(err)
      return
    }
  });
}

request(url, (error, response, body) => {
  if (error !== null) {
    console.log(url,': Is not a valid URL');
    return;
  }
  writeFile(dest, body);
});