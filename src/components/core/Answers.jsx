import React, { Component } from "react";
class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: false,
      classNames: ["", "", "", ""],
    };
    console.log("optionsss", props.optionState);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.clearClasses = this.clearClasses.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("cahngesss", prevProps.count, this.props.count);
    if (prevProps.count !== this.props.count) {
      console.log("something prop has changed.");
      let stateUpdate = JSON.parse(localStorage.getItem("Quiz"));
      if (stateUpdate[this.props.count].answer == "") {
        this.setState({
          classNames: ["", "", "", ""],
        });
      } else {
        console.log("valueoftheanswer", stateUpdate[this.props.count].answer);
        this.state.classNames[0] = "";
        this.state.classNames[1] = "";
        this.state.classNames[2] = "";
        this.state.classNames[3] = "";

        this.state.classNames[stateUpdate[this.props.count].answer - 1] =
          "selectedOptions";
        console.log("callllssname", this.state.classNames);
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
    var storearr1=[];
    let answer = Number(elem.dataset.id);
    console.log("answer",answer);
    let updatedClassNames =
      answerType == "single" ? ["", "", "", ""] : this.state.classNames;
    if (optionType == "Multiple Choice Questionnaires") {

      // var storedArray = Array.isArray(storage[id].answer)
      //   ? storage[id].answer
      //   : [];
      console.log("classNamesasdas",this.state.classNames);
      for(var i=0;i<storeArr.length;i++){
        if(storeArr[i] != ''){
          storearr1[i]=1;
        }else{
          storearr1[i]='';
        }
       
      }
      console.log("dfsdf",storearr1)
      storage[id].answer = storearr1;
    } else {
      storage[id].answer = answer;
    }
   
    // console.log("sottttttt",storage,(storedArray.push(storage[id].answer)).map(e=>e));
    localStorage.setItem("Quiz", JSON.stringify(storage));
    updatedClassNames[answer - 1] = "selectedOptions";
   
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
    let { answers, optionType, id, optionState } = this.props;
    let { classNames } = this.state;

    let transition = {
      transitionName: "example",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300,
    };
    console.log("classNames", classNames);
    //     <input type="textarea"
    //     name="textValue"
    //     multiple="true"
    //     style={{width: '100%', height: '100%'}}
    //     rows="50"

    //   />
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
