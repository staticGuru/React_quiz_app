import { ContactSupportOutlined } from "@material-ui/icons";
import React, { Component } from "react";
import data from "../questions_data/data";
import Answers from "./Answers.jsx";
import Popup from "./Popup.jsx";
let scoreValue = 0;
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      total: data.length,
      showButton: false,
      questionAnswered: false,
      score: 0,
      displayPopup: "flex",
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.handleShowButton = this.handleShowButton.bind(this);
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
    this.isEqual=this.isEqual.bind(this);
  }

  componentWillMount() {
    let { count } = this.state;
    let QuizData = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].optionType == "Multiple Choice Questionnaires") {
        QuizData[data[i].id] = {
          correct: data[i].correct,
          answer: [],
          optionType: data[i].optionType,
        };
      } else {
        QuizData[data[i].id] = {
          correct: data[i].correct,
          answer: "",
          optionType: data[i].optionType,
        };
      }
    }

    localStorage.setItem("Quiz", JSON.stringify(QuizData));
    this.insertData(count);
  }

  insertData(count, type) {
    let localStore = JSON.parse(localStorage.getItem("Quiz"));
    let optionStateArr = ["", "", "", ""];
    let selectedLocalStore =
      localStore[
        type === "previous" ? this.state.count - 1 : this.state.count + 1
      ];
 

    if (selectedLocalStore.answer != "") {
   
      optionStateArr[selectedLocalStore.answer - 1] = "selectedOptions";
    } else {
      optionStateArr = ["", "", "", ""];
    }
    var countPre = type == "previous" ? count - 1 : count;
    this.setState({
      id: data[countPre].id,
      question: data[countPre].question,
      answers: [
        data[countPre].answers[0],
        data[countPre].answers[1],
        data[countPre].answers[2],
        data[countPre].answers[3],
      ],
      correct: data[countPre].correct,
      count: type == "previous" ? this.state.count - 1 : this.state.count + 1,
      optionType: data[countPre].optionType,
      answerType: data[countPre].answerType,
      selected: data[countPre].selectedAnswer,
      optionState: optionStateArr,
    });
  }

  handleShowButton() {
    this.setState({
      showButton: true,
      questionAnswered: true,
    });
  }
  previousQuestion() {
    let { count, total } = this.state;

    this.insertData(count - 1, "previous");
 
  }
   isEqual = (first, second) => {
    const sumFirst = first.reduce((acc, val) => acc+val);
    const sumSecond = second.reduce((acc, val) => acc+val);
    if(sumFirst === sumSecond){
       return true;
    }else{
      return false;
    }
  }
  nextQuestion() {
    let { count, total } = this.state;

    if (count === total) {
      let scoreData = JSON.parse(localStorage.getItem("Quiz"));

      // console.log("sdf", scoreData);
      for (let i = 0; i < data.length; i++) {
       
        if (
          scoreData[data[i].id].optionType == "Multiple Choice Questionnaire"
        ) {
          if(this.isEqual(scoreData[data[i].id].answer, scoreData[data[i].id].correct)){
            scoreValue++;
            this.setState({
              score: this.state.score + 1,
            });
          }
        } else {
          if (scoreData[data[i].id].correct == scoreData[data[i].id].answer) {
            scoreValue++;
            this.setState({
              score: this.state.score + 1,
            });
          }
        }
      }
    
      //   setTimeout(() => {
      this.setState({
        displayPopup: "flex",
      });
      //   }, 1000);
    } else {
      this.insertData(count);
      this.setState({
        showButton: false,
        questionAnswered: false,
      });
    }
  }

  handleStartQuiz() {
    this.setState({
      displayPopup: "none",
      count: 1,
    });
  }

  handleIncreaseScore() {
    this.setState({
      score: this.state.score + 1,
    });
  }

  render() {
    let {
      count,
      total,
      question,
      optionType,
      answerType,
      id,
      selected,
      answers,
      correct,
      showButton,
      questionAnswered,
      displayPopup,
      score,
      optionState,
    } = this.state;
    return (
      <div className="container">
        <Popup
          style={{ display: displayPopup }}
          score={scoreValue}
          total={total}
          startQuiz={this.handleStartQuiz}
        />
        <div className="column">
          <div className="row">
            <div className="d-flex col-lg-12 col-md-10">
              <div className="col-lg-6 col-md-5" id="question">
                <h4 className="bg-light">
                  Question {count}/{total}
                </h4>
                <p>{question}</p>
              </div>
              <div className="col-lg-6 col-md-5">
                <Answers
                  id={id}
                  answers={answers}
                  correct={correct}
                  count={count}
                  optionType={optionType}
                  answerType={answerType}
                  selected={selected}
                  optionState={optionState}
                  showButton={this.handleShowButton}
                  isAnswered={questionAnswered}
                  increaseScore={this.handleIncreaseScore}
                />
              </div>
            </div>
            <div id="submit">
              {true ? (
                <div className="row">
                  {count != 1 ? (
                    <button
                      style={{ marginRight: 20 }}
                      className="fancy-btn"
                      onClick={this.previousQuestion}
                    >
                      Previous question
                    </button>
                  ) : null}
                  <button className="fancy-btn" onClick={this.nextQuestion}>
                    {count === total ? "Finish quiz" : "Next question"}
                  </button>
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
