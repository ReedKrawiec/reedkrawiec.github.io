function textToBin(text) {
  var length = text.length,
      output = [];
  for (var i = 0;i < length; i++) {
    var bin = text[i].charCodeAt().toString(2);
    output.push(Array(8-bin.length+1).join("0") + bin);
  }
  return output.join(" ");
}

var color1 = "red";
var color2 = "rgba(75,255,75,1)";
var color3 = "blue";

console.log(window.Bases);
var j = [1,2,3,4,5];

function setScreen(f,counter){
//  console.log(f[counter] +" "+ f + " " + counter);
console.log(f);
  $("html").css("background-color",color1);
  if(f[counter] === "0"){
    $("#number").text("0").css("color",color2);
    $("#overlay").css("display","initial");
    console.log(color2);
  }
  else{
    $("#overlay").css("display","none");
    console.log(color1);
  }
  setTimeout(function(){
    $("#overlay").css("display","none");
    $("html").css("background-color","blue");
    console.log("blue");
    setTimeout(function(){
      if(counter+1 < f.length)
        setScreen(f,counter+1);
      else {
        console.log("yellow");
        $("html").css("background-color","blue");
        $("#number").css("display","none");
      }
    },100);
  },100);
}

function FromBinary(y) {
    return y.replace(/\s*[01]{8}\s*/g, function(bin) {
      return String.fromCharCode(parseInt(bin, 2));
    });
  }

var z = prompt("Enter a word to transfer");
var x = textToBin(z).replace(/ /g,"");
console.log(x);


setTimeout(function(){
  setScreen(x,0);
},3000);
