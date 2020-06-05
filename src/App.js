import React, { Component } from 'react';
import './style/App.css';
import './style/buttons.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";
import LanguageComponent from "./components/LanguageComponent";
import FunctionKeyComponent from "./components/FunctionKeyComponent";
import { removeRedundantArguments, traverseTree, getGeneralTerm } from './js/TreeTraversal.js';
import { readSpeech } from './js/Speech.js';
import { appendSToResults, addButtonArgument } from './js/BuildArgument.js';
let data = require('./data/familydata.json');

let ARG_CHAR_LIMIT = 90;

class App extends Component {
    constructor(){
        super();

        this.state = {
            argString: "",
            argStringToPrint: "",
            result: "",
            isWaitReset: false,
            language: "mando"
        }
    }

    onClick = button => {

        switch (button) {
          case "=":
            this.calculate();
            break;
          case "C":
            this.reset();
            break;
          case "audio":
            this.playAudio();
            break;
          case "back":
            this.backspace();
            break;
          case "canto":
            this.setLanguage("canto");
            break;
          case "mando":
            this.setLanguage("mando");
            break;
          case "korean":
            this.setLanguage("korean");
            break;
          case "japanese":
            this.setLanguage("japanese");
            break;
          default:
            this.addArgument(button);
       }
    };

    playAudio = () => {
      readSpeech(this.state.language, this.state.argStringToPrint, this.state.result);
    }

    calculate = () => {

        let argArray = this.state.argString.split("'s ");
        argArray = removeRedundantArguments(argArray);
        let result = traverseTree(data, argArray);
        let errorMessage = getGeneralTerm(data, this.state.language, argArray);

        // if no arguments, default to "me"
        if (argArray.length === 0) {
          this.setState({
              argStringToPrint: "Me"
          });
        }

        try {
          if ((result.names[this.state.language] || "") !== "") {
            this.setState({
                result: result.names[this.state.language],
                isWaitReset: true
            })
          } else {
            this.setState({
                result: errorMessage,
                isWaitReset: true
            })
          }

        } catch (e) {
            this.setState({
                result: errorMessage,
                isWaitReset: true
            })
        }

    };

    reset = () => {
        this.setState({
            argString: "",
            result: "",
            argStringToPrint: "",
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

        let {toPrintedResult, toResult} = appendSToResults(this.state);
        toPrintedResult = addButtonArgument(button, toPrintedResult);

        if (toPrintedResult.length < ARG_CHAR_LIMIT) {
          this.setState({
            argString: toResult + button,
            argStringToPrint: toPrintedResult,
          })
        }
    }

    backspace = () => {
        if (this.state.isWaitReset) {
          this.reset();
        }
        else if (this.state.argString !== "") {
            let indexToSlice = this.state.argStringToPrint.lastIndexOf("'s ");
            let nextIndexToSlice = this.state.argString.lastIndexOf("'s ");

            if (indexToSlice === -1) {
              // treat as reset when it is empty
                this.reset();
            } else {
                this.setState({
                  argString: this.state.argString.substring(0, nextIndexToSlice),
                  argStringToPrint: this.state.argStringToPrint.substring(0,indexToSlice)
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
                      Asian relative titles are complicated. <br></br> Here's a calculator to help!
                    </p>
                    <LanguageComponent onClick={this.onClick} language={this.state.language}/>
                    <ResultComponent result={this.state.result} args={this.state.argStringToPrint}/>
                    <div className="row">
                        <KeyPadComponent onClick={this.onClick} isWaitReset={this.state.isWaitReset}/>
                        <FunctionKeyComponent onClick={this.onClick} isWaitReset={this.state.isWaitReset}/>
                    </div>
                    <p className="disclaimer">
                    Click the buttons according to the relation you want to know about. For example, to find your mom's older sister's title, click: <mark>Mom</mark>, <mark>Older sister</mark>, <mark>=</mark>. Click 🗣 to hear the audio, or toggle between the other languages to explore the differences/similarities between them!
                    <br></br><br></br>
                    See a bug or want to help add another language? <a href="https://github.com/anitatse/chinese-relative-title-calculator" target="_blank" rel="noopener noreferrer">Contribute</a> or <a href="mailto:anitatse@alumni.ubc.ca">email me</a> 😊
                    </p>
                    <p className="disclaimer" style={{fontSize: "14px"}}>
                    * It is understood that these titles are based off Asian customs and do not represent all of the relationships and gender identities out there. Audio feature is not compatible with all devices.
                    <br></br>
                    Inspiration from <a href="https://play.google.com/store/apps/details?id=org.igears.relativesa&hl=en" target="_blank" rel="noopener noreferrer">姨媽姑姐</a> and titles based off <a href="https://youtu.be/nCFRoILS1jY" target="_blank" rel="noopener noreferrer">Off the Great Wall</a>, <a href="https://www.learn-japanese-adventure.com/japanese-family.html" target="_blank" rel="noopener noreferrer">Learn Japanese Adventure</a> and <a href="https://thetalkingcupboard.com/2013/05/11/korean-family-and-kinship-terms/" target="_blank" rel="noopener noreferrer">The Talking Cupboard</a>.
                    </p>
                </div>
            </div>
        );
    }
}

export default App;
