import {firstpage} from "./FirstPage.js";
import * as Projects from "./ProjectsData.js" ;
import {ProjectComponent,ProjectContainer,NavBar} from "./ReactComponents.js";
import React from 'react';
import {render} from 'react-dom';

let Projects_Array = Projects.default;

render(<ProjectContainer projects={Projects_Array} />,document.getElementById("Projects_Hook"));
render(<NavBar/>,document.getElementById("NavBar"));
firstpage();
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
