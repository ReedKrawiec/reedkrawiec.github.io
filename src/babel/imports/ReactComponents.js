import React from 'react';
import {render} from 'react-dom';

let tech = [
  [
    {
       "name":"React",
       "image":"react.svg",
       "skill":"Moderate"
    },
    {
       "name":"HTML5",
       "image":"HTML5_Logo_512.png",
       "skill":"Experienced"
    },
    {
       "name":"CSS3",
       "image":"css3.png",
       "skill":"Experienced"
    },
    {
       "name":"Javascript",
       "image":"logo_JavaScript.png",
       "skill":"Experienced"
    }
  ],
  [
    {
       "name":"NodeJS",
       "image":"nodejs-logo.png",
       "skill":"Moderate"
    },
    {
       "name":"Python",
       "image":"1024px-Python-logo-notext.svg.png",
       "skill":"Basic"
    },
    {
       "name":"PHP",
       "image":"2000px-PHP-logo.svg.png",
       "skill":"Basic"
    },
    {
       "name":"SQL",
       "image":"sql-logo.png",
       "skill":"Moderate"
    }
  ],
  [
    {
       "name":"SASS",
       "image":"logo-b6e1ef6e.svg",
       "skill":"Experienced"
    },
    {
       "name":"Babel",
       "image":"babel.png",
       "skill":"Moderate"
    },
    {
       "name":"Gulp",
       "image":"gulp-2x.png",
       "skill":"Moderate"
    }
  ]
];

export class SkillContainer extends React.Component{
  constructor(){
    super();
    this.techArray = tech;
    this.changeState = this.changeState.bind(this);
    this.state = {
      selected:0
    };
  }
  changeState(id){
    this.setState({
      selected:id
    });
  }
  render(){
    return(
      <div className="tech-container">
        <TechHeader changeStateTransfer={this.changeState} selected={this.state.selected}/>
        <SkillBody data={this.techArray[this.state.selected]} />
      </div>
    );
  }
}
class TechLocationBarDesktop extends React.Component{
  render(){
    let styleObj = {
      transform:"translateX("+(this.props.active*100)+"%)",
    };
    return(
      <div className="tech-header-selected-bar-desktop" style={styleObj}></div>
    );
  }
}
class TechLocationBarMobile extends React.Component{
  render(){
    let styleObj;
    if(this.props.side === "right"){
      styleObj= {
        transform:"translateY("+(this.props.active*100)+"%)",
        right:0
      };
    }
    else{
      styleObj= {
        transform:"translateY("+(this.props.active*100)+"%)",
        left:0
      };
    }
    return(
      <div className="tech-header-selected-bar-mobile" style={styleObj}></div>
    );
  }
}
class TechHeader extends React.Component{
  render(){
    return(
      <div className="tech-header">
        <TechLocationBarMobile side="right" active={this.props.selected} />
        <TechLocationBarMobile side="left" active={this.props.selected} />
        <TechLocationBarDesktop active={this.props.selected}/>
        <TechHeaderSection text="Front-End" changeState={this.props.changeStateTransfer.bind(null,0)}/>
        <TechHeaderSection text="Back-End" changeState={this.props.changeStateTransfer.bind(null,1)}/>
        <TechHeaderSection text="Tools" changeState={this.props.changeStateTransfer.bind(null,2)}/>
      </div>
    );
  }
}
class TechHeaderSection extends React.Component{
  render(){
    return(
      <div className="tech-header-bar" data-id={this.props.id} onClick={this.props.changeState}>{this.props.text}</div>
    );
  }
}
class SkillBody extends React.Component{
  render(){
    let arr = [];
    for(let x = 0;x<this.props.data.length;x++){
      arr.push(<Skill data={this.props.data[x]} />);
    }
    return(
      <div className="tech-body">
        {arr}
      </div>
    );
  }
}

class Skill extends React.Component{
  render(){
    let imageObj = new Image();
    imageObj.src = "./images_prod/"+this.props.data.image;
    let imageClasses = "tech-body-skill-img";
    if(imageObj.height>imageObj.width){
      imageClasses+=" resizeY";
    }
    else{
      imageClasses+=" resizeX";
    }
    return(
      <div className="tech-body-skill-container">
        <div className="tech-body-skill-img-container">
          <img className={imageClasses} src={"./images_prod/"+this.props.data.image}/>
        </div>
        <p className="tech-body-skill-name"> {this.props.data.name}</p>
        <p className="tech-body-skill-skill">Skill: {this.props.data.skill}</p>
      </div>
    );
  }
}

export class ProjectContainer extends React.Component{
  render(){
    let y = [];
    for(let x = 0;x<this.props.projects.length;x++){
      let currentproject = this.props.projects[x];
      y.push(<ProjectComponent name={currentproject.name} desc={currentproject.desc} image={currentproject.image} href={currentproject.href} />);
    }
    return(
      <div className="Projects-holder">{y}</div>
    );
  }
}

export class NavBar extends React.Component{
  constructor(){
    super();
    this.state = {
      open:0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(thing){
    if(this.state.open === 0){
      this.setState({
        open:1
      });
    }
    else{
      this.setState({
        open:0
      });
    }
  }
  render(){
    return(
      <div id="Main_Info_Container" className="Nav-Bar">
        <div className="Mobile">
          <DropDown click={this.handleClick} open={this.state.open}/>
          <NavBarTap click={this.handleClick} open={this.state.open}/>
        </div>
        <div className="Desktop">
          <a className="Desktop-Nav-Bar-Item" href="#About">
            <p>About Me</p>
            <div className="bar"></div>
          </a>
          <a className="Desktop-Nav-Bar-Item" href="#projects">
            <p>Projects</p>
            <div className="bar"></div>
          </a>
          <a className="Desktop-Nav-Bar-Item" href="#skills">
            <p>Skills</p>
            <div className="bar"></div>
          </a>
        </div>
      </div>
    );
  }
}

export class DropDown extends React.Component{
  render(){
    let DropDownClasses = "DropDown Dropdown-Closed";
    if(this.props.open === 1){
      DropDownClasses = "DropDown";
    }
    console.log(this.HandleClick);
    return (
      <div className={DropDownClasses}>
        <a href="#About">
          <p>
            About Me
          </p>
        </a>
        <a href="#projects">
          <p>
            Projects
          </p>
        </a>
        <a href="#skills">
          <p>
            Skills
          </p>
        </a>
      </div>
    );
  }
}

export class NavBarTap extends React.Component{
  constructor(){
    super();
    this.HandleClick = this.HandleClick.bind(this);
  }
  HandleClick(){
    this.props.click(this);
  }
  render(){
    let tapStyles = "Mobile-Tap-Target";
    let divStyles = "Mobile-Div";
    if(this.props.open === 1){
      tapStyles+=" Mobile-Tap-Target-Open";
      divStyles+=" Open";
    }
    return(
      <div className={tapStyles} onClick={this.HandleClick}>
        <div className={divStyles}></div>
        <div className={divStyles}></div>
        <div className={divStyles}></div>
      </div>
    );
  }
}
export class ProjectComponent extends React.Component{
  render(){
      return(
      <div className="Project-Container">
        <a className="Project" href={this.props.href}>
          <div className="name-Container">
          	<p className="name">{this.props.name}</p>
            </div>
          <img className="img" src={this.props.image} />
          <div className="desc-Container">
            <p className="placeholder">placeholder</p>
            <p className="desc">{this.props.desc}</p>
          </div>
        </a>
      </div>
    );
  }
}
