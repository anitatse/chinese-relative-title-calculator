import React, {Component} from 'react';

class ResultComponent extends Component {

    render() {
        let {result} = this.props;

        if (result.hasOwnProperty('pinyin')) {
          return (
            <div className="result" style={{ display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <p className="smallertext">{this.props.args}</p>
                <div className="result" style={{ display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <p className="smallertext">{result.pinyin}</p>
                    <p>{result.characters}</p>
                </div>
            </div>
          );
        } else {
          return (
              <div className="result">
                  <p>{this.props.args}</p>
              </div>
            );
        }
    }
}


export default ResultComponent;
