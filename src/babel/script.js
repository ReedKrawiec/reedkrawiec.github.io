import {firstpage} from "./imports/FirstPage.js";
import * as Projects from "./imports/ProjectsData.js" ;
import {ProjectComponent,ProjectContainer,NavBar} from "./imports/ReactComponents.js";
import {SkillContainer} from "./imports/ReactComponents.js";
import React from 'react';
import {render} from 'react-dom';

let Projects_Array = Projects.default;

render(<ProjectContainer projects={Projects_Array} />,document.getElementById("Projects_Hook"));
render(<NavBar/>,document.getElementById("NavBar"));
render(<SkillContainer/>,document.getElementById("tech-container-mount"));
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
