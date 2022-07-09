import React, { Component } from "react";
class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: false,
      classNames:['','','',''],
    };
    console.log("optionsss", props.optionState);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.clearClasses = this.clearClasses.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("cahngesss",prevProps.count,this.props.count)
    if (prevProps.count !== this.props.count) {
           console.log('something prop has changed.')
           let stateUpdate = JSON.parse(localStorage.getItem("Quiz"));
        if(stateUpdate[this.props.count].answer ==""){
            this.setState({
                classNames: ['','','','']
              });
        }else{
            console.log("valueoftheanswer",stateUpdate[this.props.count].answer);
            this.state.classNames[0] ='';
            this.state.classNames[1] ='';
            this.state.classNames[2] ='';
            this.state.classNames[3] ='';
    
            this.state.classNames[stateUpdate[this.props.count].answer-1] ='selectedOptions';
            console.log("callllssname",this.state.classNames);
            this.setState({
                classNames: this.state.classNames
              });
        }
    }
}


  checkAnswer(e) {
    let { isAnswered, answerType, id } = this.props;

    // if(!isAnswered) {
    var storage = JSON.parse(localStorage.getItem("Quiz"));

    let elem = e.currentTarget;
    let { correct, increaseScore } = this.props;
    let answer = Number(elem.dataset.id);
    let updatedClassNames =
      answerType == "single" ? ["", "", "", ""] : this.state.classNames;
    storage[id].answer = answer;

    localStorage.setItem("Quiz", JSON.stringify(storage));
    // if(answer === correct){
    //     updatedClassNames[answer-1] = 'right';
    //     increaseScore();
    // }
    // else {
    // updatedClassNames[answer-1] = 'wrong';

    updatedClassNames[answer - 1] = "selectedOptions";
    // }

    this.setState({
      classNames: updatedClassNames,
    });

    this.props.showButton();
    // var myTime = setTimeout(() => {
    //     this.clearClasses();
    //     //console.log("IN SET Timeout")
    // }, 5000);
    // }
  }
  clearClasses() {
    this.setState({
      classNames: ["", "", "", ""],
    });
  }
  render() {
    let { answers, optionType, id,optionState } = this.props;
    let { classNames } = this.state;

    let transition = {
      transitionName: "example",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300,
    };
    console.log("classNames", classNames);

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
          <ul>
            <li
              onClick={this.checkAnswer}
              className={classNames[0]}
              data-id="1"
            >
              <span>A</span>

              <p>Image content</p>
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[1]}
              data-id="2"
            >
              <span>B</span>
              <p>Image content</p>
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[2]}
              data-id="3"
            >
              <span>C</span>
              <p>Image content</p>
            </li>

            <li
              onClick={this.checkAnswer}
              className={classNames[3]}
              data-id="4"
            >
              <span>D</span>
              <p>Image content</p>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Answers;
