import * as React from 'react';
import { render } from 'react-dom';
import If from "./components/if";
import Lander from "./pages/lander";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Services from "./pages/Services";
import { Page, NoProps, NoState } from "./helpers";

interface pageContentInterface {
  box1: Page,
  box2: Page,
  box3: Page,
  box4: Page
}

interface NavBoxProps {
  key: number;
  ident: number;
  inside: any;
  changeActive: setActiveNavBoxInterface;
  toMenu: toMenu;
  activeArray: Array<boolean>;
}

interface NavMenuState {
  activeArray?: Array<boolean>;
  hashes: Array<string>;
}

interface setActiveNavBoxInterface {
  (activeKey: number, toUpdate?: boolean): void;
}

interface NavBoxState {
  shown: boolean;
}

interface toMenu {
  (ident?: number, hash?: string, delay?: number): void
}

let setActive: any;

class NavMenu extends React.Component<NoProps, NavMenuState>{
  pageContents: pageContentInterface
  constructor(a: any) {
    super(a);
    this.state = {
      activeArray: [false, false, false, false],
      hashes: ["profiles", "projects", "services", "blog"]
    };
    if (location.hash === "#menu")
      this.state = {
        activeArray: [false, false, false, false],
        hashes: ["profiles", "projects", "services", "blog"]
      };
    else if (location.hash === "#profiles" || location.hash === "")
      this.state = {
        activeArray: [true, false, false, false],
        hashes: ["profiles", "projects", "services", "blog"]
      };
    else if (location.hash === "#projects")
      this.state = {
        activeArray: [false, true, false, false],
        hashes: ["profiles", "projects", "services", "blog"]
      };
    else if (location.hash === "#resume")
      this.state = {
        activeArray: [false, false, true, false],
        hashes: ["profiles", "projects", "services", "blog"]
      };
    else if (location.hash.substring(0, 5) === "#blog")
      this.state = {
        activeArray: [false, false, false, true],
        hashes: ["profiles", "projects", "services", location.hash.slice(1,location.hash.length)]
      };
    this.setActiveNavBox = this.setActiveNavBox.bind(this);
    setActive = this.setActiveNavBox;
    this.toMenu = this.toMenu.bind(this);
    this.updateHash = this.updateHash.bind(this);
    this.pageContents = {
      box1: Lander(this.toMenu),
      box2: Projects,
      box3: Services,
      box4: Blog(this.updateHash)
  }
}
  public updateHash(id:number, value:string):void{
    console.log(value)
    let hashes:Array<string> = this.state.hashes;
    hashes[id] = value;
    if(id === this.state.activeArray.indexOf(true)){
      let state_to_push = {
        hash: value,
        key: id
      };
        console.log(state_to_push);
        history.pushState(state_to_push, "page 2","#"+value);
    }
    this.setState(({
      hashes:hashes
    }))
  }
  public toMenu(ident: number, hash: string, delay: number = 0): void {

    history.replaceState(history.state, undefined, "");
    this.setState({ activeArray: [false, false, false, false] });
    if (hash !== undefined) {
      setTimeout(() => { this.setActiveNavBox(ident) }, delay)
    }
  }
  public setActiveNavBox(activeKey: number, DoNotUpdateHistory?: boolean): void {
    let x = DoNotUpdateHistory || false;
    let state_to_push = {
      hash: this.state.hashes[activeKey],
      key: activeKey
    };
    if (!x) {
      console.log(state_to_push);
      history.pushState(state_to_push, "page 2", "#" + this.state.hashes[activeKey]);
    }
    else
      console.log("not update");
    let newActiveArray = [false, false, false, false];
    newActiveArray[activeKey] = true;
    this.setState({ activeArray: newActiveArray });
  }
  public render() {
    return (
      <div className="fullnavmenu">
        <NavBox key={0} ident={0} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside={this.pageContents.box1} activeArray={this.state.activeArray} />
        <NavBox key={1} ident={1} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside={this.pageContents.box2} activeArray={this.state.activeArray} />
        <NavBox key={2} ident={2} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside={this.pageContents.box3} activeArray={this.state.activeArray} />
        <NavBox key={3} ident={3} changeActive={this.setActiveNavBox} toMenu={this.toMenu} inside={this.pageContents.box4} activeArray={this.state.activeArray} />
      </div>)
  }
}



class NavBox extends React.Component<NavBoxProps, NoState>{
  constructor(a: any) {
    super(a)
    this.onClick = this.onClick.bind(this);
    this.render = this.render.bind(this);
    this.NavClick = this.NavClick.bind(this);
  }
  onClick() {
    if (this.props.inside.redirectlink !== undefined) {
      window.location.href = this.props.inside.redirectlink;
    }
    else if (this.props.activeArray[this.props.ident] === false)
      this.props.changeActive(this.props.ident);
  }
  NavClick() {
    this.props.toMenu(this.props.ident);
  }
  render() {
    let navClasses = "page__navbar " + this.props.inside.navclass;
    let classes = "fullnavmenu__componentbox";
    let titleClasses = "page__title";
    let style = {};
    if (this.props.activeArray[this.props.ident]) {
      classes += " active";
      titleClasses += " hidden";
    }
    else {
      style = { zIndex: 0 };
      titleClasses += " shown";
    }
    return (
      <div style={style} className={classes} onClick={this.onClick}>
        <div className="componentbox__page">
          <div className={navClasses} onClick={this.NavClick}>
            {this.props.inside.navheader}
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
render(Main, document.getElementById("appRoot"));
let elements: any = document.querySelectorAll(".fullnavmenu__componentbox")
for (let a = 0; a < elements.length; a++) {
  elements[a].onclick = (e: any) => {
    let element: any = elements[a];
    element.style.zIndex = "99";
  }
}

window.onpopstate = function (event) {
  if (event.state !== undefined)
    setActive(event.state.key, event.state.hash, true);
};