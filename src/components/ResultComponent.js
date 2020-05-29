import React, {Component} from 'react';

class ResultComponent extends Component {

    render() {
        let {result} = this.props;

        if (result.hasOwnProperty('pinyin')) {
          return (
            <div className="result">
                <p>{result.pinyin}</p>
                <p>{result.characters}</p>
            </div>
          );
        } else {
          return (
              <div className="result">
                  <p>{result}</p>
              </div>
            );
        }
    }
}


export default ResultComponent;
