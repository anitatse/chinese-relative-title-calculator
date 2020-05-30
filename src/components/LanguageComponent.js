import React, {Component} from 'react';

class LanguageComponent extends Component {

    render() {

        if (this.props.language === "mando") {
          return (
            <div>
              <label className="radioLabel">Mandarin
                <button name="mando" className="selectedlanguage" onClick={e => this.props.onClick(e.target.name)}></button>
              </label>
              <label className="radioLabel">Cantonese
                <button name="canto" className="language" onClick={e => this.props.onClick(e.target.name)}></button>
              </label>
            </div>
          );
        } else {
          return (
            <div>
              <label className="radioLabel">Mandarin
                <button name="mando" className="language" onClick={e => this.props.onClick(e.target.name)}></button>
              </label>
              <label className="radioLabel">Cantonese
                <button name="canto" className="selectedlanguage" onClick={e => this.props.onClick(e.target.name)}></button>
              </label>
            </div>
          );
        }

    }
}


export default LanguageComponent;
