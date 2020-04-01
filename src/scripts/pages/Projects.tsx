import * as React from 'react';
import {Page, NoProps, NoState} from "../helpers";
import If from "../components/if";

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
            <Project name="Space Scroller" desc="Space Scroller is an image gallery that grabs new pictures as the user scrolls, creating an infinite scrolling experience, made to practice using the Flask framework for Python." demo="https://infinitespacescroller.herokuapp.com/" github = "https://github.com/reedkrawiec/SpaceScroller" image="assets/images_prod/spacescroller.png"/>  
            <Project name="Citizenship.io" desc="Quizzing app made to assist prospective citizens in New Brunswick pass the required test to become a citizen. Created using React, SQL and the flask Python framework." demo="http://13.58.75.230:8080/en/" github = "https://github.com/usacs/citizenship-io" image="assets/images_prod/citizenshipio.png"/>  
            <Project name="Star" desc="Star is a theme designed for personal use with the Jekyll static blog system focusing on a sleek, clean and simple design." demo="https://reedkrawiec.github.io/Star/" github="https://github.com/reedkrawiec/Star" image="assets/images_prod/starblog.png"/>
            <Project name="Kappa Klicker" desc="Kappa Klicker is a cookie clicker parody, coded using React and Redux" demo="https://reedkrawiec.github.io/Kappa-Klicker" github = "https://github.com/reedkrawiec/kappa-klicker" image="assets/images_prod/kappaklicker.png"/>   
          </div>
        </If> 
        <If condition={this.state.currentProjectType===1}>
          <div className="librarycontainer">
            <Library name="Typer" desc="A typescript/javascript react component that simulates a typing effect." github="https://github.com/ReedKrawiec/TyperComponent"/>
            <Library name="AlphaData" desc="An easy to use database for node desktop applications. Written in Typescript." github="https://github.com/ReedKrawiec/AlphaData"/>
            <Library name="SimpDate" desc="A typescript library to make working with date object easier." github="https://github.com/reedkrawiec/Simp"/>
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
const Projects:Page = {
  content: (
    <ProjectNav />
  ),
  title: "Projects",
  navclass: "page__navbar--gray"
}

export default Projects;