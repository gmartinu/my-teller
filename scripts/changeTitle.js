const cheerio = require('cheerio');
const inquirer = require("inquirer");
const fs = require('fs'); 
const path = './public/index.html'

fs.readFile(path, 'utf8', function(err, data) {
    if (err) throw err;
    var $ = cheerio.load(data);
    let questions = [
        {
          type: "input",
          name: "title",
          message: `New title: `,
          default: $("title").text(),
        },
    ];
    inquirer.prompt(questions).then((answers) => {
        $("title").text(answers.title)
        fs.writeFile(path, $.html(), (err) => {
            if (err) {
              console.log(
                "\x1b[32m\x1b[2m" + "!" + "\x1b[37m\x1b[1m Error: " + err
              );
              process.exit();
            }
            console.log(
              "\x1b[32m\x1b[2m" + "!" + "\x1b[37m\x1b[1m Title Changed! Enjoy!"
            );
          })
    })
});