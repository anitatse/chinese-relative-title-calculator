import React, {Component} from 'react';

class LanguageComponent extends Component {

    render() {

        if (this.props.language === "mando") {
          return (
            <div>
                <button name="canto" className="language" onClick={e => this.props.onClick(e.target.name)}>Cantonese</button>
                <button name="mando" className="selectedlanguage" onClick={e => this.props.onClick(e.target.name)}>Mandarin</button>
            </div>
          );
        } else if (this.props.language === "canto") {
          return (
            <div>
                <button name="canto" className="selectedlanguage" onClick={e => this.props.onClick(e.target.name)}>Cantonese</button>
                <button name="mando" className="language" onClick={e => this.props.onClick(e.target.name)}>Mandarin</button>
            </div>
          );
        }

    }
}


export default LanguageComponent;
