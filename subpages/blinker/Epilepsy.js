function textToBin(text) {
  var length = text.length,
      output = [];
  for (var i = 0;i < length; i++) {
    var bin = text[i].charCodeAt().toString(2);
    output.push(Array(8-bin.length+1).join("0") + bin);
  }
  return output.join(" ");
}

console.log(window.Bases);
var j = [1,2,3,4,5];

function setScreen(f,counter){
//  console.log(f[counter] +" "+ f + " " + counter);
  $("html").css("background-color","white");
  if(f[counter] === "0"){
    $("#number").text("0").css("color","white");
    $("#overlay").css("display","initial");
  }
  else{
    $("#overlay").css("display","none");
    $("#number").text("1").css("color","black");
  }
  setTimeout(function(){
    $("#overlay").css("display","none");
    $("#number").text("1").css("color","black");
    $("html").css("background-color","blue");
    setTimeout(function(){
      if(counter+1 < f.length)
        setScreen(f,counter+1);
      else {
        $("html").css("background-color","green");
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

var z = prompt("meme");
var x = textToBin(z).replace(/ /g,"");
console.log(x);


setTimeout(function(){
  setScreen(x,0);
},500);
