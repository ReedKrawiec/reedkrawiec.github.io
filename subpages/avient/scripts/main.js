"use strict";var resizeFunc=function(t){var e={height:1800,width:1920},i={height:window.innerHeight,width:window.innerWidth},h={height:1100,width:450},n=document.getElementById("dynbackground"),d=void 0;i.height>i.width?(d=i.width<h.width?i.width/h.width:h.width/i.width,n.style.height="auto",h.height/e.height*n.height>i.height?(n.style.width="auto",n.style.height=e.height*i.height/h.height-20+"px"):n.style.width=e.width*d+"px"):(d=i.height<h.height?i.height/h.height:h.height/i.height,n.style.width="auto",h.width/e.width*n.width>i.width?(n.style.height="auto",n.style.width=e.width*i.width/h.width-20+"px"):n.style.height=e.height*d+"px");var s=(i.width-n.width)/2;n.style.left=s+"px"},open=!1,toggleFunc=function t(){var e=document.getElementsByClassName("content")[0],i=document.getElementsByClassName("overlay")[0],h=document.getElementsByClassName("sidebar")[0],n=document.getElementsByClassName("mainPage")[0];n.classList.toggle("active"),i.classList.toggle("active"),e.classList.toggle("active"),h.classList.toggle("active"),open?i.removeEventListener("click",t):i.addEventListener("click",t),open=!open},navButton=document.getElementsByClassName("hamburger")[0];navButton.addEventListener("click",toggleFunc),window.addEventListener("load",function(t){resizeFunc()}),resizeFunc();
//# sourceMappingURL=main.js.map
