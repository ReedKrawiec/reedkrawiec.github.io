/*
if(window.location.protocol=="https:"){
    window.location.assign("http://reedkrawiec.github.io")
}
*/

$( document ).ready(function(){



  $("#piechart").css("width",$("#piechart").height());
  var words = ["programs.","websites.","games.","user interfaces.","servers.","cool things."]
  var current_word = words[0];
  var d = 1;
  $("#blog_home").css("top",$("#Main_Info_Container").height());

  $("#blog_home").click(function(){
    document.getElementById("blog_frame").src = "https://reedkrawiec.github.io/blog";
  })

  setInterval(function(){
    //#0099CC #f6f1ed
      if(d){
          $("#cursor_bar").css("color","#f6f1ed")
          $("#cursor_bar").css("text-shadow","4px 4px #002E3D")
          d=0;
      }
      else{
        $("#cursor_bar").css("color","#0099CC")
          $("#cursor_bar").css("text-shadow","4px 4px #0099CC")
        d=1;
      }
  },500)
var pages = ["Page_1","Page_2","Page_3","Page_4"];
var current_page = "Page_1";
var last_page = "";
$("#"+current_page+"_click").css("opacity","1");
var transition = 0;
function nextPage(page){
    if(!transition){
        pages = ["Page_1","Page_2","Page_3","Page_4"];
      if(page != current_page){
        /*

        $("#"+page+"_Bar").css("width","100%");

        $("#"+current_page+"_Bar").css("width","0%");
        */
        $("#"+current_page+"_click").removeAttr('style');
        $("#"+page+"_click").css("opacity","1");
        $("#"+current_page+"_Bar").toggleClass("fullwidth");
        $("#"+page+"_Bar").toggleClass("fullwidth");
        remove_from_array(current_page);
        remove_from_array(page);
        remove_from_array(last_page);
        $("#"+last_page).css("z-index","10");
        $("#"+pages[0]).css("z-index","11");
        $("#"+current_page).css("z-index","12")
        $("#"+page).css("z-index","13");
        $("#"+page).css("left","100%")
        transition = 1;
        $("#"+page).animate({
          left:0
        },1000,function(){
          transition = 0;
          last_page = current_page;
          current_page=page;
        });
      };
    }
};
function remove_from_array(thing){
    var index = pages.indexOf(thing);
      if (index > -1) {
      pages.splice(index, 1);
  }
}
$("#Page_1_link").click(function(){
    nextPage("Page_1")
})
$("#Page_2_link").click(function(){
    nextPage("Page_2")
})
$("#Page_3_link").click(function(){
    nextPage("Page_3")
})
$("#Page_4_link").click(function(){
    nextPage("Page_4")
})
$("#Page_1_Mobile").click(function(){
    nextPage("Page_1")
})
$("#Page_2_Mobile").click(function(){
    nextPage("Page_2")
})
$("#Page_3_Mobile").click(function(){
    nextPage("Page_3")
})
$("#Page_4_Mobile").click(function(){
    nextPage("Page_4")
})
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
          },500)

        }

    }
    epic = 1;
  }
  if(removing == 0){
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
})

$("#language_box_1").css("opacity","1");
var current_box = "box_1";
var things = ["#language_box_1","#language_box_2","#language_box_3"]
var transition2 = 0;

$("#language_box_1").click(function(){
  console.log("lang 1")

  if(current_box != "box_1" && transition2 == 0){
    $("#actual_coding_time").text("8 months")
    transition2 = 1;
    current_box = "box_1";
    for(var afa = 0;afa<things.length;afa++){
      $(things[afa]).removeAttr('style');
    }
    $("#language_box_1").css("opacity","1");
    $("#expbar_real").animate({
      width:"80%"
    },250,function(){
      transition2 = 0;
    });
  }
})
$("#language_box_2").click(function(){
  if(current_box != "box_2" && transition2 == 0){
    $("#actual_coding_time").text("6 months")
    transition2 = 1;
    current_box = "box_2";
    for(var afa = 0;afa<things.length;afa++){
      $(things[afa]).removeAttr('style');
    }
    $("#language_box_2").css("opacity","1");
    $("#expbar_real").animate({
      width:"60%"
    },250,function(){
      transition2 = 0;
    });
  }
})
$("#language_box_3").click(function(){
  if(current_box != "box_3" && transition2 == 0){
    $("#actual_coding_time").text("4 months")
    transition2 = 1;
    current_box = "box_3";
    for(var afa = 0;afa<things.length;afa++){
      $(things[afa]).removeAttr('style');
    }
    $("#language_box_3").css("opacity","1");
    $("#expbar_real").animate({
      width:"43%"
    },250,function(){
      transition2 = 0;
    });
  }
})

  window.onresize = function() {
    $("#blog_home").css("top",$("#Main_Info_Container").height());
    $("#piechart").css("width",$("#piechart").height());
    if($(document).width()>861){
      $("#dropdown").css("display","none")
    }
  }
});

//url("../backgrounds/background1.jpg");
