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
            isWaitS: false,
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
        else if(button === "canto") {
          this.setState({ language: "canto" }, () => {
            if (this.state.isWaitReset) {
              console.log(this.state);
              this.calculate();
            }
          } );

        }
        else if(button === "mando") {
          this.setState({ language: "mando" }, () => {
            if (this.state.isWaitReset) {
              console.log(this.state);
              this.calculate();
            }
          } );

        }
        else if (button === "s") {
            this.setState({
                  result: this.state.result + "'s ",
                  printedresult: this.state.printedresult + "'s ",
                  isWaitS: false
                })
       } else {

           var toPrintedResult;

           if (button === "oldersister") {
                toPrintedResult = this.state.printedresult + "older sister"
           }
           else if (button === "youngersister") {
                toPrintedResult = this.state.printedresult + "younger sister"
           }
           else if (button === "olderbrother") {
                toPrintedResult = this.state.printedresult + "older brother"
           }
           else if (button === "youngerbrother") {
                toPrintedResult = this.state.printedresult + "younger brother"
           } else {
                toPrintedResult = this.state.printedresult + button
           }

           this.setState({
             result: this.state.result + button,
             printedresult: toPrintedResult,
             isWaitS: true
           })

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
                printedresult: "idk",
                isWaitReset: true
            })
        }
    };

    reset = () => {
        this.setState({
            result: "",
            printedresult: "",
            isWaitReset: false,
            isWaitS: false
        })
    };

    render() {
        return (
            <div className="container">
                <div className="calculator-body">
                    <h1>Chinese Relative Title Calculator</h1>
                    <p>
                      Chinese relative titles are complicated. Here's a calculator to help! <br></br>
                      Inspiration from <a href="https://play.google.com/store/apps/details?id=org.igears.relativesa&hl=en">姨媽姑姐</a> and titles based off <a href="https://youtu.be/nCFRoILS1jY">Off the Great Wall</a>.
                    </p>
                    <LanguageComponent onClick={this.onClick} language={this.state.language}/>
                    <ResultComponent result={this.state.printedresult}/>
                    <KeyPadComponent onClick={this.onClick} isWaitReset={this.state.isWaitReset} isWaitS={this.state.isWaitS}/>
                    <p className="disclaimer">* It is understood that these titles are asian customs and do not represent all gender identities and relationships out there. See a bug or want to help add another language?  <a href="mailto:anitatse@alumni.ubc.ca">Email me</a> :)</p>
                </div>
            </div>
        );
    }
}

export default App;
