import React, { Component } from "react";

let storearr1=[];
let classArr=["", "", "", ""];
class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: false,
      classNames: ["", "", "", ""],
      textArea:'',
    };
    // console.log("optionsss", props.optionState);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.clearClasses = this.clearClasses.bind(this);
    this.onChangeTextArea=this.onChangeTextArea.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.count !== this.props.count) {
      console.log("something prop has changed.");
      let stateUpdate = JSON.parse(localStorage.getItem("Quiz"));
      if (stateUpdate[this.props.count].answer == "") {
        this.setState({
          classNames: ["", "", "", ""],
        });
      } else {
        // console.log("valueoftheanswer", stateUpdate[this.props.count].answer);
        this.state.classNames[0] = "";
        this.state.classNames[1] = "";
        this.state.classNames[2] = "";
        this.state.classNames[3] = "";
      
        if(stateUpdate[this.props.count].optionType =='word' || stateUpdate[this.props.count].optionType =='image'){
          this.state.classNames[stateUpdate[this.props.count].answer - 1] =
          "selectedOptions";
        }else if(stateUpdate[this.props.count].optionType =='Open Ended Questionnaires'){

        }else{
          for(let x of stateUpdate[this.props.count].answer){
            console.log("answer",x,this.props.count);
            this.state.classNames[x - 1] =
          "selectedOptions";
          }
        }

        
        this.setState({
          classNames: this.state.classNames,
        });
      }
    }
  }

  checkAnswer(e) {
    let { isAnswered, answerType, id, optionType } = this.props;

    // if(!isAnswered) {
    var storage = JSON.parse(localStorage.getItem("Quiz"));

    let elem = e.currentTarget;
    let { correct, increaseScore } = this.props;
    var storeArr=this.state.classNames;
    var storearr1=storage[id].answer.length!=0?storage[id].answer:[];
    // var count = 0;
    let answer = Number(elem.dataset.id);
    let updatedClassNames =
      answerType == "single" ? ["", "", "", ""] : this.state.classNames;
    if (optionType == "Multiple Choice Questionnaires") {
      storearr1.push(answer);
         storage[id].answer=storearr1;
         localStorage.setItem("Quiz", JSON.stringify(storage));
      
    } else {
      storage[id].answer = answer;
      localStorage.setItem("Quiz", JSON.stringify(storage));
    }
   
  
    updatedClassNames[answer - 1] = "selectedOptions";
   
    this.setState({
      classNames: updatedClassNames,
    });

    this.props.showButton();
   
  }
  clearClasses() {
    this.setState({
      classNames: ["", "", "", ""],
    });
  }
  onChangeTextArea(e){

    this.setState({
      textArea:e.target.value
    });
    var Storage= JSON.parse(localStorage.getItem('Quiz'));
    Storage[this.props.id].answer=e.target.value;
    localStorage.setItem('Quiz',JSON.stringify(Storage));
  }
  render() {
    let { answers, optionType, id, optionState } = this.props;
    let { classNames,textArea } = this.state;
    var count=0;
    let transition = {
      transitionName: "example",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300,
    };
    // if(optionType =="Multiple Choice Questionnaires"){
    //   let renderStorage=JSON.parse(localStorage.getItem("Quiz"));
    //   storearr1=[];
    //   for(var i=0;i<classNames.length;i++){
    //     if(classNames[i] != ''){
    //       storearr1[count]=i+1;
    //        count++;
    //     }else{
    //       // storearr1[i]='';
    //     }
       
    //   }
    //   console.log("storearr1", renderStorage[id]);
    //   renderStorage[id].answer=storearr1;
    //   localStorage.setItem("Quiz", JSON.stringify(renderStorage));

    // }
  
    return (
      <div id="answers">
        {optionType == "word" ? (
          <ul>
            <li
              onClick={this.checkAnswer}
              className={classNames[0]}
              data-id="1"
            >
              <span>A</span>
              <p>{answers[0]}</p>
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[1]}
              data-id="2"
            >
              <span>B</span>
              <p>{answers[1]}</p>
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[2]}
              data-id="3"
            >
              <span>C</span>
              <p>{answers[2]}</p>
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[3]}
              data-id="4"
            >
              <span>D</span>
              <p>{answers[3]}</p>
            </li>
          </ul>
        ) : null}

        {optionType == "image" ? (
          <ul id="imageContainer">
            <li
              onClick={this.checkAnswer}
              className={classNames[0]}
              data-id="1"
            >
              <span>A</span>

              <img width="50" height="50" src={answers[0]} alt="image" />
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[1]}
              data-id="2"
            >
              <span>B</span>
              <img width="50" height="50" src={answers[1]} alt="image" />
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[2]}
              data-id="3"
            >
              <span>C</span>
              <img width="50" height="50" src={answers[2]} alt="image" />
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[3]}
              data-id="4"
            >
              <span>D</span>
              <img width="50" height="50" src={answers[3]} alt="image" />
            </li>
          </ul>
        ) : null}
        {optionType == "Open Ended Questionnaires" ? (
          <div style={{ marginTop: 60 }}>
            <textarea
              rows={15}
              style={{
                width: "80%",
                marginLeft: 60,
                border: "1px solid black",
              }}
              value={textArea}
              onChange={this.onChangeTextArea}
              placeholder="Please type here..."
            ></textarea>
          </div>
        ) : null}
        {optionType == "Multiple Choice Questionnaires" ? (
          <ul>
            <li
              onClick={this.checkAnswer}
              className={classNames[0]}
              data-id="1"
            >
              <span>A</span>
              <p>{answers[0]}</p>
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[1]}
              data-id="2"
            >
              <span>B</span>
              <p>{answers[1]}</p>
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[2]}
              data-id="3"
            >
              <span>C</span>
              <p>{answers[2]}</p>
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[3]}
              data-id="4"
            >
              <span>D</span>
              <p>{answers[3]}</p>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Answers;
