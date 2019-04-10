let fs = require("fs");
let path = require("path");
var md = require('markdown-it')();

fs.readdir("./blog_content", (err, x) => {
  let counter = 0;
  let files = [];
  for (let file of x) {
    fs.readFile((path.join("./blog_content", file)), "utf-8", (err, y) => {
      files.push(y);
      if (counter === x.length - 1) {
        processFiles(files, generateFiles)
      }
      counter++;
    });
  };
})

const processTitle = (x) => x.split(" ").join("-").toLowerCase();

function generateFiles(obj) {
 let meta_only = obj.map(x => x.obj)
 fs.mkdir(path.join("public","assets","blog_generated"),(err)=>{
   if(err) console.log(err);
    fs.writeFile(path.join(__dirname,"public","assets","blog_generated","summary.json"), JSON.stringify(meta_only), (err,x) => {
      if(err) console.log(err);
    })
    for(let file of obj){
      let text = file.fulltext;
      let date = file.obj.date;
      let title = file.obj.title;
      let obj_stringify = JSON.stringify({
        text:text,
        date:date,
        title:title
      });
      file = file.obj
      fs.writeFile((path.join(__dirname,"public","assets","blog_generated",`${processTitle(file.title)}.json`)), obj_stringify, (err)=>{
        if(err) console.log(err);
      })
    }
    
 })
}

function processFiles(files, cb) {
  let post_info = [];
  for (let c of files) {
    let arr = c.split(/[\n\r]/).filter((x) => !!x);
    let title = arr[0];
    let date = arr[1];
    let text = md.render(arr.slice(2, arr.length).join("\n\n"));
    post_info.push({
      obj: {
        title:title,
        id: processTitle(title),
        date: date,
        summary: text.substring(0, 500)
      },
      fulltext: text
    });
  }
  cb(post_info);
}