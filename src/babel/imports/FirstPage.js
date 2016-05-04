export function firstpage() {

  var words = ["programs.","websites.","games.","user interfaces.","servers.","cool things."];
  var current_word = words[0];
  var d = 1;

  setInterval(function(){
    //#0099CC #f6f1ed
      if(d){
          $("#cursor_bar").css("color","#f6f1ed");
          $("#cursor_bar").css("text-shadow","4px 4px #002E3D");
          d=0;
      }
      else{
        $("#cursor_bar").css("color","#0099CC");
          $("#cursor_bar").css("text-shadow","4px 4px #0099CC");
        d=1;
      }
  },500);
function remove_from_array(thing){
    var index = pages.indexOf(thing);
      if (index > -1) {
      pages.splice(index, 1);
  }
}

/*
  changeword();
function changeword(){
      var str = current_word;
      console.log(str);
      for(var a = 0;a<current_word.length;a++){
        console.log(str);
        str = str.substring(0, str.length - 1);

      }
}
  function set_text(str){
      $("#message_word").text(str);
  }
  */
var counter=0;
var wordnum = 0;
var removing = 1;
var str = current_word;
var helpercounter=0;
var fullword = 1;
var helper2 = 0;
var epic = 2;
timer();
function timer(){
    if(fullword){
      if(helper2 < 5){
        helper2++;
      }
      else{
        helper2 = 0;
        fullword = 0;
      }
    }
    else{
        word_change();
    }
    setTimeout(timer,100*epic);
}
function word_change(){
  if(removing == 1){
    str = str.substring(0, str.length - 1);
    $("#message_word").text(str);
    counter++;

    if(counter == current_word.length+1){
        if(current_word == words[words.length-1]){
          wordnum = 0;
          current_word = words[0];
          counter = 0;

          removing = 0;
          str = "";
        }
        else{
          setTimeout(function(){
            current_word = words[wordnum+1];
            wordnum++;
            counter = 0;
            removing = 0;
            str = "";
          },500);

        }

    }
    epic = 1;
  }
  if(removing === 0){
      str += current_word[helpercounter];
      helpercounter++;
      $("#message_word").text(str);
      counter++;
      if(counter==current_word.length){
        fullword = 1;
        removing = 1;
        counter = 0;
        helpercounter = 0;
      }
      epic = 2;
    }

}

$("#dropdown").css("top","57px");

$("#menu_click").click(function(){
  $("#dropdown").stop();
  $("#dropdown").toggle("fast");
});
  window.onresize = function() {
    if($(document).width()>861){
      $("#dropdown").css("display","none");
    }
  };
}
