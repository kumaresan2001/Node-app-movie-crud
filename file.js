const fs = require("fs");
// const quto = "no beauty";

const q = "live more ,worry less😘😊";

// for (let i = 1; i <= 10; i++) {
//   fs.writeFile(`./backup/text-${i}.html`, q, (err) => {
//     console.log("complete");
//   });
// }
//  task
// node file.js 30
const [, , nofile] = process.argv;
// genFiles(nofile);
// early return
// function genFiles(nofile) {
//   if (nofile > 100) {
//     console.log("maximum number reached ");
//     return; //stops function
//   }
//   for (let i = 1; i <= nofile; i++) {
//     fs.writeFile(`./backup/text-${i}.html`, q, (err) => {
//       console.log("complete");
//     });
//   }
// }

// read
// fs.readFile("./cool.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("err");
//   } else {
//     console.log(data);
//   }
// });

// append file
const quto1 = "DREAM WITHOUT FEAR,LOVE WITHOUT LIMITS";
fs.appendFile("./fun.html", "\n" + quto1, (err) => {
  console.log("complete");
});

//deleted file

fs.unlink("./delete.txt", (err) => {
  console.log("complete deleting");
});
