  import * as React from 'react';
  import TyperWrapper from "../components/typer"
  import {Page} from "../helpers";

  function createLander(a:any){
    return {
      content:(
          <div className="lander">
            <p className="lander__text--medium">I'm Reed.</p>
            <p className="lander__text--small">I like to build user interfaces.</p>
            <p className="lander__text--small icons">
              <a href="https://github.com/reedkrawiec" className="icon-github-1"></a>
              <a href="https://twitter.com/reedkrawiec" className="icon-twitter-1"></a>
              <a href="mailto:reedkrawiec@gmail.com" className="icon-mail-1"></a>
              <a href="https://codepen.io/reedkrawiec" className="icon-codepen"></a>
            </p>
            <div className="lander__buttons">
                <div className="button__container" onClick={()=>{a(2,"resume",700)}}>
                  <div className="button__text">About Me</div>
                </div>
                <div className="button__container" onClick={()=>{a(1,"projects",700)}}>
                  <div className="button__text">Projects</div>
                </div>
                <div className="button__container" onClick={()=>{a(3,"blog",700)}}>
                  <div className="button__text">Blog</div>
                </div>
            </div>
            <div className="lander__bg">
              <img className="bg__image bg__image1" src="./assets/images_prod/dd1.png"/>
            </div>
          </div>
        ),
        title:"Profiles",
        navclass:"page__navbar--green",
        navheader:(
        <p className="navbar__headertext">
          <TyperWrapper words={["Hello!","Bonjour!","Kamusta!","Cześć!"]} delay={5000} /> <span className="blink">|</span>
        </p>)
      }
  }  

  export default createLander;