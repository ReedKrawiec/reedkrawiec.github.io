import * as React from 'react';
import {Page, NoProps, NoState} from "../helpers";
import If from "../components/if";

interface ProjectProps{
  name:string,
  desc:string,
  demo?:string,
  github:string,
  image?:string,
  info?:string,
  switch?:any
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
            <a target="_blank" className="textcontainer__link" href={props.demo}>Demo</a>
          </If>
          <a target="_blank" className="textcontainer__link" href={props.github}>Github</a>
          <If condition={props.info !== undefined}>
            <a target="_blank" className="textcontainer__link" onClick={()=>{props.switch(3, props.info, 700)}}>More Info</a>
          </If>
        </div>
      </div> 
    </div>
  );
}

interface LibraryProps{
  name:string,
  desc:string,
  github:string,
  crates_link?:string,
  pypi_link?:string,
  info?:string,
  switch?:any
}

const Library = (props:LibraryProps)=>{
  return(
    <div className="project library">
      <div className="library__textcontainer">
        <p>{props.name}</p>
        <hr/>
        <p>{props.desc}</p>
        <div className="textcontainer__linkcontainer">
          <a target="_blank" href={props.github} className="textcontainer__link">Github</a>
          <If condition={props.crates_link !== undefined}>
            <a target="_blank" href={props.crates_link} className="textcontainer__link">Crates.io</a>
          </If>
          <If condition={props.pypi_link !== undefined}>
            <a target="_blank" href={props.pypi_link} className="textcontainer__link">Pypi.org</a>
          </If>
          <If condition={props.info !== undefined}>
            <a target="_blank" className="textcontainer__link" onClick={()=>{props.switch(3, props.info, 700)}}>More Info</a>
          </If>
        </div>
      </div>
    </div>
  )
}

interface ProjectNavButtonProps{
  name:string
  id:number
  changeFunc:any,
  active:number
}

const ProjectNavButton = (props:ProjectNavButtonProps)=>{
  let cl = "selector__button"
  if(props.active == props.id){
    cl = cl + " active"
  }
   return(
     <div onClick={()=>{props.changeFunc(props.id)}}className={cl}>
       <div className="button__name">{props.name}</div>
     </div>
  )
}

interface ProjectNavState{
  currentProjectType:number
}

interface comp_props{
  a:any
}

class ProjectNav extends React.Component<comp_props,ProjectNavState>{
  constructor(a:any){
    super(a);
    this.state={currentProjectType:0}
    this.changeCurrentProjects = this.changeCurrentProjects.bind(this);
  }
  changeCurrentProjects(id:number){
    this.setState({currentProjectType:id});
  }
  render(){
    let projects:any;
    return(
      <div>
       <div className="page__projects">
          <div className="placeholder"></div>
          <div className="project__selector">
            <ProjectNavButton active={this.state.currentProjectType} name="Web" id={0} changeFunc={this.changeCurrentProjects} />
            <ProjectNavButton active={this.state.currentProjectType} name="Libraries" id={1} changeFunc={this.changeCurrentProjects} />
            <ProjectNavButton active={this.state.currentProjectType} name="Applications" id={2} changeFunc={this.changeCurrentProjects} />
           </div>
        {projects}   
        <If condition={this.state.currentProjectType===0}>
          <div>
            <Project name="Twitch Surfer" desc="An interactive streamer schedule viewer for Twitch. Similar to channel guides on Television. Created with React and Python" demo="https://reedkrawiec.github.io/twitchsurfer/" github = "https://github.com/ReedKrawiec/twitchsurfer" image="assets/images_prod/twitchsurfer.png" switch={this.props.a}  />
            <Project name="Number-Reader" desc="Simple digit recognition with Pytorch using a Convolutional neural network" demo="https://number-recognizer.herokuapp.com/" github="https://github.com/ReedKrawiec/Number-Reader" image="assets/images_prod/numberreader.png"/>
            <Project name="Space Scroller" desc="Space Scroller is an image gallery that grabs new pictures as the user scrolls, creating an infinite scrolling experience, made to practice using the Flask framework for Python." demo="https://reedkrawiec.github.io/SpaceScroller/" github = "https://github.com/reedkrawiec/SpaceScroller" image="assets/images_prod/spacescroller.png"/>  
            <Project name="Citizen" desc="Quizzing app made to assist prospective citizens in New Brunswick pass the required test to become a citizen. Created using React, SQL and the flask Python framework." demo="http://3.135.215.76:5000/en/aboutus" github = "https://github.com/usacs/citizenship-io" image="assets/images_prod/citizenshipio.png" info="blog/citizen-info" switch={this.props.a}/ >  
            <Project name="Star" desc="Star is a theme designed for personal use with the Jekyll static blog system focusing on a sleek, clean and simple design." demo="https://reedkrawiec.github.io/Star/" github="https://github.com/reedkrawiec/Star" image="assets/images_prod/starblog.png"/>
            <Project name="Kappa Klicker" desc="Kappa Klicker is a cookie clicker parody, coded using React and Redux" demo="https://reedkrawiec.github.io/Kappa-Klicker" github = "https://github.com/reedkrawiec/kappa-klicker" image="assets/images_prod/kappaklicker.png"/>   
          </div>
        </If> 
        <If condition={this.state.currentProjectType===1}>
          <div className="librarycontainer"> 
            <Library name="Fen to Board Image" pypi_link="https://pypi.org/project/fenToBoardImage/" desc="Python library that enables quick and easy rendering of chess boards from Fen strings" github="https://github.com/ReedKrawiec/Fen-To-Board-Image" />
            <Library name="Serbo" crates_link="https://crates.io/crates/serbo-mc" desc="A Rust crate that allows for easy management of Minecraft servers." github="https://github.com/ReedKrawiec/Serbo " info="blog/serbo-info" switch={this.props.a}/>
            <Library name="Van" desc="JS Canvas game engine written in Typescript." github="https://github.com/ReedKrawiec/Van" info="blog/van-info" switch={this.props.a}/>
            <Library name="flask-type-checker" desc="Simple decorator that checks if a flask request parameter exists, and if it's the intended type." github="https://github.com/ReedKrawiec/flask-type-checker"/>
            <Library name="Typer" desc="A typescript/javascript react component that simulates a typing effect." github="https://github.com/ReedKrawiec/TyperComponent"/>
            <Library name="AlphaData" desc="An easy to use database for node desktop applications. Written in Typescript." github="https://github.com/ReedKrawiec/AlphaData"/>
            <Library name="SimpDate" desc="A library to make working with date objects easier. Written using Typescript." github="https://github.com/reedkrawiec/Simp"/>
          </div>
        </If>       
        <If condition={this.state.currentProjectType===2}>
          <div>
            <Project name="Van-Editor" desc="A room editor for van" github="https://github.com/ReedKrawiec/Van-Editor" image="assets/images_prod/Van2.png"/>
            <Project name="Compactor" desc="A Rust script to automatically delete unaccessed files within a folder" github="https://github.com/ReedKrawiec/compactor"/>
            <Project name="PassCmd" desc="A command line password manager." github="https://github.com/reedkrawiec/PassCMD" />
          </div>
        </If>   
      </div>
        
      </div>
    )
  }
}
function createProjects(a:any){
  return {
    content: (
      <ProjectNav a={a} />
    ),
    title: "Projects",
    navclass: "page__navbar--gray"
  }
}

export default createProjects;