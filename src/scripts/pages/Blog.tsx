import * as React from 'react';
import {Page, NoProps, NoState} from '../helpers';
import If from "../components/if";

interface selectPostFunction{
  (id:string):void
}

const entry_preview = (title:string, text:string, post:BlogPreviewObj, func:selectPostFunction) => {
  return (
  <div onClick={()=>{func(post.id)}} className="blog__post preview">
    <h1 className="title">{title}</h1>
    <div dangerouslySetInnerHTML={{__html: text}}></div>
  </div>);
}

interface BlogPreviewObj{
  title:string
  tags: Array<string>
  summary:string
  page:number
  id:string
}

interface BlogState{
  stateID:number
  loadingPosts:number
  loadingIndivPost:number
  indivPost:any
  summJson:Array<BlogPreviewObj>
}

interface BlogProps{
  hashFunc:{
    (a:number,b:string):void
  },
  postloader:any
}

class BlogComponent extends React.Component<BlogProps,BlogState>{
  constructor(a:any,b:any){
    super(a);
    this.state = {
      indivPost:{
        title:"placeholder",
        text:"placeholder",
        tags:[]
      },
      summJson:[],
      loadingPosts:1,
      loadingIndivPost:0,
      stateID:0
    }
    this.loadPost = this.loadPost.bind(this);
    this.props.postloader(this.loadPost);
  }
  async componentDidMount(){
    let response = await fetch("assets/blog_generated/summary.json");
    let json:Array<BlogPreviewObj> = await response.json();
    this.setState({
      summJson:json,
      loadingPosts:0
    });
    if(location.hash.substring(0,5) === "#blog" && location.hash.length > 5){
      this.loadPost(location.hash.substring(6,location.hash.length));
    };
  }
  async loadPost(postid:string){
    this.setState({
      loadingIndivPost:1,
      stateID:1
    });
    let response = await fetch(`assets/blog_generated/${postid}.json`);
    let x = await response.json();
    this.props.hashFunc(3,`blog/${postid}`);
    let text = x.text;
    this.setState({
      loadingIndivPost:0,
      indivPost:{
        title:x.title,
        text: text,
        date: x.date
      }
    });

  }
  render(){
    let _this = this;
    console.log(this.state.indivPost)
    return (
      <div className = "page__blog">
        <div className="placeholder"></div>
        <If condition={this.state.stateID === 1 && this.state.loadingIndivPost===1}>
          <p>LOADING POST</p>
        </If>
        <If condition={this.state.stateID === 1 && this.state.loadingPosts === 0 && this.state.loadingIndivPost === 0}>
          <div className="blog__view max">
            <div className="blog__post max noborder">
              <p className="blog__back" onClick={()=>{
                _this.setState({stateID:0});
                this.props.hashFunc(3,'blog');
                }}>BACK🡄</p>
              <h1 className="title">{this.state.indivPost.title}</h1>
              <p className="date">{this.state.indivPost.date}</p>
              <div className="content" dangerouslySetInnerHTML={{__html: this.state.indivPost.text}}></div>
            </div>  
          </div>
       </If>
        <If condition={this.state.stateID === 0 && this.state.loadingPosts === 1 && this.state.loadingIndivPost === 0}>
         <div className="blog__page">
          <p>LOADING</p>
        </div>
        </If> 
        <If condition={this.state.stateID === 0 && this.state.loadingPosts === 0 && this.state.loadingIndivPost === 0}>
          <div className="blog__view">
            {
              this.state.summJson.map((obj)=> {
                return entry_preview(obj.title,obj.summary,obj, _this.loadPost)
              })
            }
          </div>
         </If> 
      </div>
    );
  }
}

function Blog(setHash:any,postloader:any){
  return {
    content: (
      <BlogComponent hashFunc={setHash} postloader={postloader} />
    ),
    title: "Blog",
    navclass: "page__navbar--indigo"
  }
}

  

export default Blog