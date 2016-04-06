import {firstpage} from "./FirstPage.js";
import * as Projects from "./ProjectsData.js" ;
import {ProjectComponent} from "./ReactComponents.js";
import React from 'react';
import {render} from 'react-dom';

let Projects_Array = Projects.default;



render(<ProjectComponent/>,document.getElementById("Projects_Hook"));
$( document ).ready(firstpage);
