import * as React from 'react';
import TyperWrapper from "../components/typer"
import { Page } from "../helpers";

function createLander(a: any) {
  return {
    content: (
      <div className="fullpage">
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
            <div className="button__container" onClick={() => { a(1, "projects", 700) }}>
              <div className="button__text">Projects</div>
            </div>
            <div className="button__container" onClick={() => { a(3, "blog", 700) }}>
              <div className="button__text">Blog</div>
            </div>
          </div>
          <div className="lander__bg">
            <img className="bg__image bg__image1" src="./assets/images_prod/dd1.png" />
          </div>
        </div>
        <div className="lander__about__container">
          <div className="lander__about">
            <h1>About me</h1>
            <p>I'm a Sophomore Computer Science student at Rutgers University. I enjoy tinkering with new, interesting and innovative technologies and disciplines within CS. My free time is most enjoyed when it's spent doing an interesting personal project, or playing my guitar. Right now my interests are in Web Design and Development, App development, Machine Learning and Systems Programming.</p>
            <h1>Skills</h1>
            <p>I've been doing web programming since I was in middle school. I have extensive experience with React.js and other front-end frameworks and libraries, along with a solid CS foundation and knowledge of the in's and out's of Javascript. I've deployed servers written in Node.js and Python, putting both to use in websites and apps developed from the ground up by myself. I also have experience with SQL, designing and developing systems to securely store user data, and implementing token-based login systems. Within school, I've gained a deeper understanding of Computer Architecture, alongside work done in Java and C.</p>
            <h1>Tools</h1>
            <p>Through my side projects, I have gained experience with various development tools and skills. Many of my projects are tracked through git, and their repositories are hosted on my Github page. I have worked with Heroku and AWS in order to host my projects. My projects have used various build tools and systems, such as gulp, babel, webpack and SCSS. I worked with Photoshop to design graphics and outline my projects to ensure a clear direction while working.</p>
          </div>
          <div className="lander__canvas">
            <canvas height="500" width="500" id="lcanvas"></canvas>
          </div>
        </div>

      </div>
    ),
    title: "Lander",
    navclass: "page__navbar--green",
    navheader: (
      <p className="navbar__headertext">
        <TyperWrapper words={["Hello!", "Bonjour!", "Kamusta!", "Cześć!"]} delay={5000} /> <span className="blink">|</span>
      </p>)
  }
}

export default createLander;