import React from 'react';
import {render} from 'react-dom';

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
