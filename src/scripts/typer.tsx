import * as React from "react";

interface none{

}

interface TyperProps{
   word:string
}

interface TyperState{
  word:string
}

class Typer extends React.Component<TyperProps,TyperState>{
  state:any
  constructor(props:any){
    super();
    this.state= {word:props.word}
  }
  componentWillReceiveProps(nextProps:any){
    let finished_timer_ref:any;
    let this_ = this;
    let current_word_index = this.state.word.length - 1;
    const word_remove = ()=>{
      if(current_word_index === -1){
        clearInterval(timerInterval);
        current_word_index = 0;
        finished_timer_ref = setInterval(word_writer,200);
      } 
      else{
        this.setState({word:this_.state.word.substring(0,current_word_index)});
        current_word_index--;
      }
    }
    const word_writer = ()=>{
      let word_length = nextProps.word.length;
      if(current_word_index === word_length){
        clearInterval(finished_timer_ref);
      }
      else{
        let word_slice = this.state.word+=nextProps.word[current_word_index];
        this.setState({word:word_slice});
        current_word_index++;
      }
    }
    let timerInterval =  setInterval(word_remove,100);
  }
  render(){
    return(<span>{this.state.word}</span>)
  }
}

interface TyperWrapperState{
  current_word:number;
}

interface TyperWrapperProps{
  words:Array<string>
  delay:number
}

class TyperWrapper extends React.Component<TyperWrapperProps,TyperWrapperState>{
  
  changeWord(){
    let new_value:number = this.state.current_word + 1;
    if(new_value === this.props.words.length)
      new_value = 0;
    this.setState({current_word:new_value}) 
  }
  componentDidMount(props:any){
    let this_ = this
    setInterval(()=>{this_.changeWord()},this_.props.delay);
  }
  constructor(){
    super();
    this.state = {current_word:0}
    this.changeWord = this.changeWord.bind(this);
  }
  render(){
    return (<Typer word={this.props.words[this.state.current_word]} />);
  }
}

export default TyperWrapper