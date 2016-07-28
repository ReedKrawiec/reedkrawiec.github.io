/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import {render} from 'react-dom';

interface NoProps {}
interface NoState {}

interface NavBoxProps{
  zIndexArray:Array<number>;
  key:number;
  ident:number;
  inside:any;
  changeActive:setActiveNavBoxInterface;
  toMenu:toMenu;
  activeArray:Array<boolean>;
}

interface NavMenuState{
  activeArray?:Array<boolean>;
  zIndexArray?:Array<number>;
}

interface setActiveNavBoxInterface{
  (activeKey: number,hash:string): void;
}

interface NavBoxState{
  shown:boolean;
}

interface toMenu{
  (ident?:number,hash?:string):void
}

class NavMenu extends React.Component<NoProps,NavMenuState>{
  box1:any
  box2:any
  box3:any
  box4:any;
  constructor(){
    super();
    this.state={
      activeArray:[false,false,false,false],
      zIndexArray:[0,1,2,3] 
    };
    if(location.hash === "#menu")
      this.state={
      activeArray:[false,false,false,false],
      zIndexArray:[0,1,2,3]  
      };
    if(location.hash === "#profiles"|| location.hash === "")
      this.state={
      activeArray:[true,false,false,false],
      zIndexArray:[1,2,3,0]  
      };  
    if(location.hash === "#projects")
      this.state={
      activeArray:[false,true,false,false],
      zIndexArray:[0,2,3,1]  
      };    
    if(location.hash === "#resume")
      this.state={
      activeArray:[false,false,true,false],
      zIndexArray:[0,1,3,2]  
      };    
    if(location.hash === "#blog")
      this.state={
      activeArray:[false,false,false,true],
      zIndexArray:[0,1,2,3]  
      };  
    this.setActiveNavBox = this.setActiveNavBox.bind(this);
    this.toMenu = this.toMenu.bind(this);
    this.box1 = {
      content:(
         <div>
          <div className="placeholder"></div>
          <div className="page__profile center">
            <p className="profile__name">Hi! I'm Reed.</p>
            <p className="profile__tagline">I like to develop websites.</p>
            <p className="profile__icons">
              <a href="https://github.com/reedkrawiec" className="icon-github-1"></a>
              <a href="https://twitter.com/reedkrawiec" className="icon-twitter-1"></a>
              <a href="mailto:reedkrawiec@gmail.com" className="icon-mail-1"></a>
              <a href="https://codepen.io/reedkrawiec/" className="icon-codepen"></a>
            </p>
            <p className="profile__links"><span onClick={()=>{this.toMenu(1,"projects")}}>Projects</span><span onClick={()=>{this.toMenu(2,"resume")}}>Resume</span><span onClick={()=>{this.toMenu(3,"blog")}}>Blog</span></p>
          </div>
         </div> ),
      title:"Profiles",
      hash:"profiles",
      navclass:"page__navbar--green"
    };//
    this.box2 = {
      content:(
        <div className="page__projects">
          <div className="placeholder"></div>
          <p className="title">Projects</p>
          <div className="project">
           <div className="project__imagecontainer">
            <img className = "imagecontainer__image" src="assets/images_prod/starblog.png" />  
           </div>
           <div className="project__textcontainer">
            <p>Star</p>
            <hr />
            <p>Star is a simple theme that I designed for personal use with the Jekyll static blog system. The theme is free for use however.</p>
            <a className="textcontainer__link" href="https://reedkrawiec.github.io/Star/">Demo</a>
            <a className="textcontainer__link" href="https://github.com/reedkrawiec/Star">Github</a>
           </div> 
          </div>
          <div className="project">
           <div className="project__imagecontainer">
            <img className = "imagecontainer__image" src="assets/images_prod/spacescroller.png" />  
           </div>
           <div className="project__textcontainer">
            <p>Space Scroller</p>
            <hr />
            <p>Space Scroller is an image gallery that grabs new pictures as the user scrolls, creating an infinite scrolling experience, made to practice using the Flask framework for Python.</p>
            <a className="textcontainer__link" href="https://infinitespacescroller.herokuapp.com/">Demo</a>
            <a className="textcontainer__link" href="https://github.com/reedkrawiec/SpaceScroller">Github</a>
           </div> 
          </div>
         </div> ),
      title:"Projects",
      hash:"projects",
      navclass:"page__navbar--gray"
    };
    this.box3 = {
      content:(
         <div>
          <div className="placeholder"></div>
          <div className="page__resume">
            <div className="resume__column">
              <section>
               <p className="column__heading">Reed Krawiec</p>
               <div className="underline"></div>
               <p className="column__text">reedkrawiec@gmail.com</p>
               <p className="column__text">reedkrawiec.github.io</p>
              </section>
              <section>
                <p className="column__heading">Languages</p>
                <div className="underline"></div>
                <ul>
                  <li>Javascript</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>Python</li>
                </ul>
              </section>
              <section>
                <p className="column__heading">Technologies</p>
                <div className="underline"></div>
                <ul>
                  <li>React</li>
                  <li>Flask</li>
                  <li>SASS</li>
                  <li>Typescript</li>
                </ul>
               </section> 
            </div>
            <div className="resume__column">
              <section>
                <p className="column__heading">Projects</p>
                <div className="underline"></div>
                <ul>
                  <li>
                    <div className="column__project">
                      <p className="project__projectheading">Star</p>
                      <p className="project__text">HTML, SASS(CSS), Typescript(Javascript)</p>
                      <div className="underline"></div>
                      <p className="project__text">Free for use jekyll theme.</p>
                    </div>
                   </li> 
                   <li>
                    <div className="column__project">
                      <p className="project__projectheading">SpaceScroller</p>
                      <p className="project__text">HTML, SASS(CSS), Typescript(Javascript), Flask(Python)</p>
                      <div className="underline"></div>
                      <p className="project__text">Infinite scrolling gallery of space pictures.</p>
                    </div>
                   </li> 
                </ul>   
              </section>
              <section>
                <p className="column__heading">About Me</p>
                <div className="underline"></div>
                <p className="column__text">I am a young web developer with a passion for creating great, interactive websites. I have been working with web technologies since 2014, and will be teaching Front-End development to students at my school.</p>
              </section>
            </div>
          </div>
         </div> ),
      title:"Resume",
      hash:"resume",
      navclass:"page__navbar--brown"
    };
    this.box4 = {
      content:(
        <div>
          <img className="page__blogimage" src="assets/images_prod/myblog.png" />
         </div> ),
      title:"Blog",
      hash:"blog",
      redirectlink:"http://reedkrawiec.github.io/blog",
      navclass:"page__navbar--none"
    };
    
  }
  private updateZIndexes(ident:number):void{
    let newZIndexArray = this.state.zIndexArray;
    newZIndexArray.splice(this.state.zIndexArray.indexOf(ident),1);
    newZIndexArray.push(ident);
    console.log(newZIndexArray);
    this.setState({zIndexArray:newZIndexArray});
    
  }
  public toMenu(ident:number,hash:string):void{
    history.replaceState(undefined, undefined,  "#menu");
    this.updateZIndexes(ident);
    this.setState({activeArray:[false,false,false,false]});
    if(hash!==undefined)
      this.setActiveNavBox(ident,hash)
  }
  public setActiveNavBox(activeKey:number,hash:string):void{
    history.replaceState(undefined, undefined,  "#"+hash);
    this.updateZIndexes(activeKey);
    let newActiveArray = [false,false,false,false];
    newActiveArray[activeKey] = true;
    this.setState({activeArray:newActiveArray});
  }
  public render(){

    return(
      <div className="fullnavmenu">
        <NavBox key={0} ident={0} zIndexArray={this.state.zIndexArray} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside = {this.box1} activeArray={this.state.activeArray} />
        <NavBox key={1} ident={1} zIndexArray={this.state.zIndexArray} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside = {this.box2} activeArray={this.state.activeArray} />
        <NavBox key={2} ident={2} zIndexArray={this.state.zIndexArray} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside = {this.box3} activeArray={this.state.activeArray} />
        <NavBox key={3} ident={3} zIndexArray={this.state.zIndexArray} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside = {this.box4} activeArray={this.state.activeArray} />
      </div>)
  }
}

class NavBox extends React.Component<NavBoxProps,NoState>{
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
    this.render = this.render.bind(this);
    this.NavClick = this.NavClick.bind(this);
  }
  onClick(){
    if(this.props.inside.redirectlink !== undefined){
      window.location.href = this.props.inside.redirectlink;
    }
    else if(this.props.activeArray[this.props.ident] === false)
     this.props.changeActive(this.props.ident,this.props.inside.hash);
  }
  NavClick(){
    this.props.toMenu(this.props.ident);
  }
  render(){
    let navClasses = "page__navbar " + this.props.inside.navclass;
    let classes = "fullnavmenu__componentbox";
    let titleClasses = "page__title";
    let style = {zIndex:this.props.zIndexArray.indexOf(this.props.ident)}
    console.log(this.props.activeArray[this.props.ident]);
    if(this.props.activeArray[this.props.ident]){
      classes+=" active";
      titleClasses+=" hidden";
    }
    else{
      titleClasses+=" shown"
    }  
    return(
    <div style={style} className={classes} onClick={this.onClick}>
      <div className="componentbox__page">
        <div className={navClasses} onClick={this.NavClick}>
          <i className="navbar__menuicon icon-menu"></i>
        </div>
        <div className="page__content">
          {this.props.inside.content}
        </div>
        <p className={titleClasses}>{this.props.inside.title}</p>
      </div>
    </div>)
  }
}
render(<NavMenu />,document.getElementById("appRoot"));