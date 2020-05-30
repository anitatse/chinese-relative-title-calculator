import React, { Component } from 'react';
import './style/App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";
import LanguageComponent from "./components/LanguageComponent";
import { removeRedundantArguments, traverseTree } from './TreeTraversal.js';
import { readSpeech } from './Speech.js';
var data = require('./data/familydata.json');

class App extends Component {
    constructor(){
        super();

        this.state = {
            result: "",
            printedresult: "",
            isWaitReset: false,
            language: "mando"
        }
    }

    onClick = button => {

        if (button === "="){
            this.calculate()
        }
        else if(button === "C"){
            this.reset()
        }
        else if(button === "audio") {
            this.playAudio()
        }
        else if(button === "back") {
            this.backspace()
        }
        else if(button === "canto") {
            this.setLanguage("canto")
        }
        else if(button === "mando") {
            this.setLanguage("mando")
        }
        else {
            this.addArgument(button)
       }
       
    };

    playAudio = () => {
      readSpeech(this.state.language, this.state.printedresult);
    }

    calculate = () => {

        var arg_array = removeRedundantArguments(this.state.result.split("'s "))
        var result = traverseTree(data, arg_array);

        try {
            this.setState({
                // eslint-disable-next-line
                printedresult: result.names[this.state.language],
                isWaitReset: true
            })
        } catch (e) {
            this.setState({
                printedresult: "Error 🥺",
                isWaitReset: true
            })
        }
    };

    reset = () => {
        this.setState({
            result: "",
            printedresult: "",
            isWaitReset: false
        })
    };

    setLanguage = (language) => {
      this.setState({ language: language },
        () => {
        if (this.state.isWaitReset) {
          console.log(this.state);
          this.calculate();
        }
      } );
    }

    addArgument = (button) => {
        var toPrintedResult;
        var toResult;

        if (this.state.printedresult !== "") {
             toPrintedResult = this.state.printedresult + "'s ";
             toResult = this.state.result + "'s ";
        } else {
             toPrintedResult = this.state.printedresult
             toResult = this.state.result;
        }

        if (button === "oldersister") {
             toPrintedResult = toPrintedResult + "older sister"
        }
        else if (button === "youngersister") {
             toPrintedResult = toPrintedResult + "younger sister"
        }
        else if (button === "olderbrother") {
             toPrintedResult = toPrintedResult + "older brother"
        }
        else if (button === "youngerbrother") {
             toPrintedResult = toPrintedResult + "younger brother"
        } else {
             toPrintedResult = toPrintedResult + button
        }

        this.setState({
          result: toResult + button,
          printedresult: toPrintedResult,
        })
    }

    backspace = () => {
        if (this.state.isWaitReset) {
          this.reset();
        }
        else if (this.state.result !== "") {
            var indexToSlice = this.state.printedresult.lastIndexOf("'s ");
            var nextIndexToSlice = this.state.result.lastIndexOf("'s ");

            if (indexToSlice === -1) {
                this.reset();
            } else {
                this.setState({
                  result: this.state.result.substring(0, nextIndexToSlice),
                  printedresult: this.state.printedresult.substring(0,indexToSlice)
                })
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="calculator-body">
                    <h1>Chinese Relative Title Calculator</h1>
                    <LanguageComponent onClick={this.onClick} language={this.state.language}/>
                    <ResultComponent result={this.state.printedresult}/>
                    <KeyPadComponent onClick={this.onClick} isWaitReset={this.state.isWaitReset}/>
                </div>
            </div>
        );
    }
}

export default App;
