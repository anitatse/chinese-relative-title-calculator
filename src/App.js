import React, { Component } from 'react';
import './style/App.css';
import './style/buttons.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";
import LanguageComponent from "./components/LanguageComponent";
import FunctionKeyComponent from "./components/FunctionKeyComponent";
import { removeRedundantArguments, traverseTree } from './TreeTraversal.js';
import { readSpeech } from './Speech.js';
let data = require('./data/familydata.json');

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
        else if(button === "korean") {
            this.setLanguage("korean")
        }
        else if(button === "japanese") {
            this.setLanguage("japanese")
        }else {
            this.addArgument(button)
       }

    };

    playAudio = () => {
      readSpeech(this.state.language, this.state.printedresult);
    }

    calculate = () => {

        let arg_array = removeRedundantArguments(this.state.result.split("'s "))
        let result = traverseTree(data, arg_array);

        try {

          if ((result.names[this.state.language] || "") !== "") {
            this.setState({
                printedresult: result.names[this.state.language],
                isWaitReset: true
            })
          } else {
            this.setState({
                printedresult: "Error 😢",
                isWaitReset: true
            })
          }

        } catch (e) {
            this.setState({
                printedresult: "Error 😢",
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
          this.calculate();
        }
      } );
    }

    addArgument = (button) => {
        let toPrintedResult;
        let toResult;

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
            let indexToSlice = this.state.printedresult.lastIndexOf("'s ");
            let nextIndexToSlice = this.state.result.lastIndexOf("'s ");

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
                    <h1>Asian Relative Title Calculator</h1>
                    <p>
                      Asian relative titles are complicated. Here's a calculator to help! <br></br>
                      Inspiration from <a href="https://play.google.com/store/apps/details?id=org.igears.relativesa&hl=en" target="_blank">姨媽姑姐</a> and titles based off <a href="https://youtu.be/nCFRoILS1jY" target="_blank">Off the Great Wall</a>, <a href="https://www.learn-japanese-adventure.com/japanese-family.html" target="_blank">Learn Japanese Adventure</a> and <a href="https://thetalkingcupboard.com/2013/05/11/korean-family-and-kinship-terms/" target="_blank">The Talking Cupboard</a>.
                    </p>
                    <LanguageComponent onClick={this.onClick} language={this.state.language}/>
                    <ResultComponent result={this.state.printedresult}/>
                    <div className="row"><KeyPadComponent onClick={this.onClick} isWaitReset={this.state.isWaitReset}/><FunctionKeyComponent onClick={this.onClick} isWaitReset={this.state.isWaitReset}/></div>
                    <p className="disclaimer">
                    Click the buttons according to the relation you want to know about. For example, to find your mom's older sister's title, click <mark>Mom</mark>, <mark>Older sister</mark>, <mark>=</mark>. Click 🗣 to hear the audio, or toggle between the other languages to explore the differences/similarities between them!
                    <br></br><br></br>
                    See a bug or want to help add another language? <a href="https://github.com/anitatse/chinese-relative-title-calculator" target="_blank">Contribute</a> or <a href="mailto:anitatse@alumni.ubc.ca">email me</a> 😊
                    <br></br><br></br>
                    * It is understood that these titles are based off Asian customs and do not represent all of the relationships and gender identities out there. Audio feature is not compatible with all devices.

                    </p>
                </div>
            </div>
        );
    }
}

export default App;
