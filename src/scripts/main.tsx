  /// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import {render} from 'react-dom';
import TyperWrapper from "./typer.tsx";
import If from "./if.tsx";
interface NoProps {}
interface NoState {}

interface NavBoxProps{
  key:number;
  ident:number;
  inside:any;
  changeActive:setActiveNavBoxInterface;
  toMenu:toMenu;
  activeArray:Array<boolean>;
}

interface NavMenuState{
  activeArray?:Array<boolean>;
}

interface setActiveNavBoxInterface{
  (activeKey: number,hash:string,toUpdate?:boolean): void;
}

interface NavBoxState{
  shown:boolean;
}

interface toMenu{
  (ident?:number,hash?:string,delay?:number):void
}

let setActive:any;

class NavMenu extends React.Component<NoProps,NavMenuState>{
  pageContents:any
  constructor(){
    super();
    this.state={
      activeArray:[false,false,false,false],
    };
    if(location.hash === "#menu")
      this.state={
      activeArray:[false,false,false,false],
      };
    else if(location.hash === "#profiles"|| location.hash === "")
      this.state={
      activeArray:[true,false,false,false],
      };  
    else if(location.hash === "#projects")
      this.state={
      activeArray:[false,true,false,false],
      };    
    else if(location.hash === "#resume")
      this.state={
      activeArray:[false,false,true,false],
      };    
    else if(location.hash === "#blog")
      this.state={
      activeArray:[false,false,false,true],
      };  
    this.setActiveNavBox = this.setActiveNavBox.bind(this);
    setActive = this.setActiveNavBox;
    this.toMenu = this.toMenu.bind(this);
    this.pageContents = {
      box1:{
        content:(
            <div className="lander">
              <p className="lander__text--medium lander__typer">
                <TyperWrapper words={["Hello!","Bonjour!","你好!","Kamusta!","Cześć!","今日は!","नमस्ते!"]} delay={5000} /> <span className="blink">|</span>
              </p>
              <p className="lander__text--medium">I'm Reed.</p>
              <p className="lander__text--small">I like to build user interfaces.</p>
              <p className="lander__text--small icons">
                <a href="https://github.com/reedkrawiec" className="icon-github-1"></a>
                <a href="https://twitter.com/reedkrawiec" className="icon-twitter-1"></a>
                <a href="mailto:reedkrawiec@gmail.com" className="icon-mail-1"></a>
                <a href="https://codepen.io/reedkrawiec" className="icon-codepen"></a>
              </p>
              <div className="lander__buttons">
                  <div className="button__container" onClick={()=>{this.toMenu(1,"projects",700)}}>
                    <div className="button__text">Projects</div>
                  </div>
                  <div className="button__container" onClick={()=>{this.toMenu(2,"resume",700)}}>
                    <div className="button__text">Resume</div>
                  </div>
                  <div className="button__container" onClick={()=>{this.toMenu(3,"blog",700)}}>
                    <div className="button__text">Blog</div>
                  </div>
              </div>
            </div>
          ),
          title:"Profiles",
          hash:"profiles",
          navclass:"page__navbar--green"
        },
      box2:{
        content:(
          <ProjectNav/>
        ),
        title:"Projects",
        hash:"projects",
        navclass:"page__navbar--gray"
      },
      box3:{
        content:(
          <div>
            <div className="placeholder"></div>
            <div className="page__info">
              <section className="info__section info__bio">
                <div className="info__header">
                  About me
                </div>
              </section>
              <section className="info__section info__languages">
                <div className="info__header">
                  Languages
                </div>
              </section>
              <section className="info__section info__tools">
                <div className="info__header">
                  Tools
                </div>
              </section>
            </div>
          </div> 
        ),
        title:"Contact Me",
        hash:"contact",
        navclass:"page__navbar--brown"
      },
       
      box4:{
        content:(
          <div>
            <img className="page__blogimage" src="assets/images_prod/myblog.png" />
          </div> ),
        title:"Blog",
        hash:"blog",
        navclass:"page__navbar--indigo"
      }
      
    }  
   }
  public toMenu(ident:number,hash:string,delay:number):void{
    
    history.replaceState(history.state,undefined,"");
    this.setState({activeArray:[false,false,false,false]});
    if(delay === undefined)
      delay = 0;
    if(hash!==undefined){
      setTimeout(()=>{this.setActiveNavBox(ident,hash)},delay)
    }
  }
  public setActiveNavBox(activeKey:number,hash:string,DoNotUpdateHistory?:boolean):void{
    let x = DoNotUpdateHistory || false;
    let state_to_push = {
          hash:hash,
          key:activeKey};
    if(!x){
      console.log(state_to_push);
      history.pushState(state_to_push,"page 2", "#"+hash);
    }
    else
      console.log("not update");
    let newActiveArray = [false,false,false,false];
    newActiveArray[activeKey] = true;
    this.setState({activeArray:newActiveArray});
  }
  public render(){
    return(
      <div className="fullnavmenu">
        <NavBox key={0} ident={0} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside = {this.pageContents.box1} activeArray={this.state.activeArray} />
        <NavBox key={1} ident={1} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside = {this.pageContents.box2} activeArray={this.state.activeArray} />
        <NavBox key={2} ident={2} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside = {this.pageContents.box3} activeArray={this.state.activeArray} />
        <NavBox key={3} ident={3} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside = {this.pageContents.box4} activeArray={this.state.activeArray} />
      </div>)
  }
}

interface ProjectProps{
  name:string,
  desc:string,
  demo?:string,
  github:string,
  image?:string
}

const Project = (props:ProjectProps)=>{
  let demo_link:any;
  let classes = "project"
  if(props.image === undefined){
    classes+=" noImage";
  }
  return (
    <div className={classes}>
      <If condition = {props.image !== undefined}>
        <div className="project__imagecontainer">
          <img className = "imagecontainer__image" src={props.image} />  
        </div>
      </If>
      <div className="project__textcontainer">
        <p>{props.name}</p>
        <hr />
        <p>{props.desc}</p>
        <div className="textcontainer__linkcontainer">
          <If condition={props.demo !== undefined}>
            <a className="textcontainer__link" href={props.demo}>Demo</a>
          </If>
          <a className="textcontainer__link" href={props.github}>Github</a>
        </div>
      </div> 
    </div>
  );
}

interface LibraryProps{
  name:string,
  desc:string,
  github:string
}

const Library = (props:LibraryProps)=>{
  return(
    <div className="project library">
      <div className="library__textcontainer">
        <p>{props.name}</p>
        <hr/>
        <p>{props.desc}</p>
        <div className="textcontainer__linkcontainer">
          <a href={props.github} className="textcontainer__link">Github</a>
        </div>
      </div>
    </div>
  )
}

interface ProjectNavButtonProps{
  name:string
  id:number
  changeFunc:any
}

const ProjectNavButton = (props:ProjectNavButtonProps)=>{
   return(
     <div onClick={()=>{props.changeFunc(props.id)}}className="selector__button">
       <div className="button__name">{props.name}</div>
     </div>
  )
}

interface ProjectNavState{
  currentProjectType:number
}

class ProjectNav extends React.Component<NoProps,ProjectNavState>{
  constructor(){
    super();
    this.state={currentProjectType:0}
    this.changeCurrentProjects = this.changeCurrentProjects.bind(this);
  }
  changeCurrentProjects(id:number){
    this.setState({currentProjectType:id});
  }
  render(){
    let projects:any;
    return(
       <div className="page__projects">
          <div className="placeholder"></div>
          <div className="project__selector">
            <ProjectNavButton name="Web" id={0} changeFunc={this.changeCurrentProjects} />
            <ProjectNavButton name="Libraries" id={1} changeFunc={this.changeCurrentProjects} />
            <ProjectNavButton name="Applications" id={2} changeFunc={this.changeCurrentProjects} />
           </div>
        {projects}   
        <If condition={this.state.currentProjectType===0}>
          <div>
            <Project name="Star" desc="Star is a simple theme that I designed for personal use with the Jekyll static blog system. The theme is free for use however." demo="https://reedkrawiec.github.io/Star/" github="https://github.com/reedkrawiec/Star" image="assets/images_prod/starblog.png"/>
            <Project name="Kappa Klicker" desc="Kappa Klicker is a cookie clicker parody, recently re-coded using React and Redux" demo="https://reedkrawiec.github.io/Kappa-Klicker" github = "https://github.com/reedkrawiec/kappa-klicker" image="assets/images_prod/kappaklicker.png"/>   
            <Project name="Space Scroller" desc="Space Scroller is an image gallery that grabs new pictures as the user scrolls, creating an infinite scrolling experience, made to practice using the Flask framework for Python." demo="https://infinitespacescroller.herokuapp.com/" github = "https://github.com/reedkrawiec/SpaceScroller" image="assets/images_prod/spacescroller.png"/>  
          </div>
        </If> 
        <If condition={this.state.currentProjectType===1}>
          <div className="librarycontainer">
            <Library name="SimpDate" desc="A typescript library to make working with date object easier." github="https://github.com/reedkrawiec/Simp"/>
            <Library name="AlphaData" desc="An easy to use database for node desktop applications. Written in Typescript." github="https://github.com/ReedKrawiec/AlphaData"/>
            <Library name="Typer" desc="A typescript/javascript react component that simulates a typing effect." github="https://github.com/ReedKrawiec/TyperComponent"/>
          </div>
        </If>       
        <If condition={this.state.currentProjectType===2}>
          <div>
            <Project name="PassCmd" desc="A command line password manager." github="https://github.com/reedkrawiec/PassCMD" />
          </div>
        </If>   
      </div>
    )
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
    let style = {};
    if(this.props.activeArray[this.props.ident]){
      classes+=" active";
      titleClasses+=" hidden";
    }
    else{
      style = {zIndex:0};
      titleClasses+=" shown";
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
let Main = <NavMenu />;
render(Main,document.getElementById("appRoot"));
let elements:any = document.querySelectorAll(".fullnavmenu__componentbox")
for(let a = 0;a<elements.length;a++){
  elements[a].onclick = (e:any)=>{
    let element:any = elements[a];
    element.style.zIndex = "99";
  }
}

window.onpopstate = function(event) {
  if(event.state !== undefined)
    setActive(event.state.key,event.state.hash,true);
};