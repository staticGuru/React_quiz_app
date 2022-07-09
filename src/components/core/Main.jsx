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
  }

  componentWillMount() {
    let { count } = this.state;
    let QuizData = {};
    for (let i = 0; i < data.length; i++) {
      QuizData[data[i].id] = { correct: data[i].correct, answer: "" };
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
    console.log(
      "callledddbeeefore",
      selectedLocalStore,
      selectedLocalStore.answer,
      type
    );

    if (selectedLocalStore.answer != "") {
      console.log(
        "callleddd",
        selectedLocalStore,
        selectedLocalStore.answer,
        type
      );
      optionStateArr[selectedLocalStore.answer - 1] = "selectedOptions";
    } else {
      optionStateArr = ["", "", "", ""];
    }
    this.setState({
      id: data[count].id,
      question: data[count].question,
      answers: [
        data[count].answers[0],
        data[count].answers[1],
        data[count].answers[2],
        data[count].answers[3],
      ],
      correct: data[count].correct,
      count: type == "previous" ? this.state.count - 1 : this.state.count + 1,
      optionType: data[count].optionType,
      answerType: data[count].answerType,
      selected: data[count].selectedAnswer,
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

    // if (count === total) {
    //   this.setState({
    //     displayPopup: "flex",
    //   });
    // } else {
    console.log("countp", count);

    // this.setState({count:count-2},()=>{console.log("count",this.state.count);});

    this.insertData(count - 1, "previous");
    //   this.setState({
    //     showButton: false,
    //     questionAnswered: false,
    //   });
    // }
  }

  nextQuestion() {
    let { count, total } = this.state;

    if (count === total) {
      let scoreData = JSON.parse(localStorage.getItem("Quiz"));
   
      console.log("sdf", scoreData);
      for (let i = 0; i < data.length; i++) {
        console.log(
          scoreData[data[i].id].correct == scoreData[data[i].id].answer
        );
        if (scoreData[data[i].id].correct == scoreData[data[i].id].answer) {
          scoreValue++;
          this.setState({
            score: this.state.score + 1,
          });
        }
      }
      //   this.setState({ score: scoreValue });
      console.log("scsfsd", scoreValue);
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
