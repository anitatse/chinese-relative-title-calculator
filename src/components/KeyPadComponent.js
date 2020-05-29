import React, {Component} from 'react';

class KeyPadComponent extends Component {


    render() {

        if (this.props.isWaitReset) {
            return (
                <div className="button">
                    <button name="dad" onClick={e => this.props.onClick(e.target.name)} disabled>Dad</button>
                    <button name="mom" onClick={e => this.props.onClick(e.target.name)} disabled>Mom</button>
                    <button className="fnButton" name="audio" onClick={e => this.props.onClick(e.target.name)}>🗣</button><br/>

                    <button name="husband" onClick={e => this.props.onClick(e.target.name)} disabled>Husband</button>
                    <button name="wife" onClick={e => this.props.onClick(e.target.name)} disabled>Wife</button>
                    <button className="fnButton" name="C" onClick={e => this.props.onClick(e.target.name)}>C</button>
                    <br/>

                    <button name="olderbrother" onClick={e => this.props.onClick(e.target.name)} disabled>Older brother</button>
                    <button name="oldersister" onClick={e => this.props.onClick(e.target.name)} disabled>Older sister</button>
                    <button className="fnButton" name="s" onClick={e => this.props.onClick(e.target.name)} disabled>'s </button>
                    <br/>

                    <button name="youngerbrother" onClick={e => this.props.onClick(e.target.name)} disabled>Younger brother</button>
                    <button name="youngersister" onClick={e => this.props.onClick(e.target.name)} disabled>Younger sister</button>
                    <button className="fnButton" name="=" onClick={e => this.props.onClick(e.target.name)} disabled>=</button>
                    <br/>

                    <button name="son" onClick={e => this.props.onClick(e.target.name)} disabled>Son</button>
                    <button name="daughter" onClick={e => this.props.onClick(e.target.name)} disabled>Daughter</button><br/>
                </div>
            );
        } else if (this.props.isWaitS) {
            return (
                <div className="button">
                    <button name="dad" onClick={e => this.props.onClick(e.target.name)} disabled>Dad</button>
                    <button name="mom" onClick={e => this.props.onClick(e.target.name)} disabled>Mom</button>
                    <button className="fnButton" name="audio" onClick={e => this.props.onClick(e.target.name)} disabled>🗣</button><br/>

                    <button name="husband" onClick={e => this.props.onClick(e.target.name)} disabled>Husband</button>
                    <button name="wife" onClick={e => this.props.onClick(e.target.name)} disabled>Wife</button>
                    <button className="fnButton" name="C" onClick={e => this.props.onClick(e.target.name)}>C</button>
                    <br/>

                    <button name="olderbrother" onClick={e => this.props.onClick(e.target.name)} disabled>Older brother</button>
                    <button name="oldersister" onClick={e => this.props.onClick(e.target.name)} disabled>Older sister</button>
                    <button className="fnButton" name="s" onClick={e => this.props.onClick(e.target.name)}>'s </button>
                    <br/>

                    <button name="youngerbrother" onClick={e => this.props.onClick(e.target.name)} disabled>Younger brother</button>
                    <button name="youngersister" onClick={e => this.props.onClick(e.target.name)} disabled>Younger sister</button>
                    <button className="fnButton" name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
                    <br/>

                    <button name="son" onClick={e => this.props.onClick(e.target.name)} disabled>Son</button>
                    <button name="daughter" onClick={e => this.props.onClick(e.target.name)} disabled>Daughter</button><br/>
                </div>
            );
        } else {
            return (
                <div className="button">
                    <button name="dad" onClick={e => this.props.onClick(e.target.name)}>Dad</button>
                    <button name="mom" onClick={e => this.props.onClick(e.target.name)}>Mom</button>
                    <button className="fnButton" name="audio" onClick={e => this.props.onClick(e.target.name)} disabled>🗣</button>
                    <br/>

                    <button name="husband" onClick={e => this.props.onClick(e.target.name)}>Husband</button>
                    <button name="wife" onClick={e => this.props.onClick(e.target.name)}>Wife</button>
                    <button className="fnButton" name="C" onClick={e => this.props.onClick(e.target.name)}>C</button>
                    <br/>

                    <button name="olderbrother" onClick={e => this.props.onClick(e.target.name)}>Older brother</button>
                    <button name="oldersister" onClick={e => this.props.onClick(e.target.name)}>Older sister</button>
                    <button className="fnButton" name="s" onClick={e => this.props.onClick(e.target.name)} disabled>'s </button>
                    <br/>

                    <button name="youngerbrother" onClick={e => this.props.onClick(e.target.name)}>Younger brother</button>
                    <button name="youngersister" onClick={e => this.props.onClick(e.target.name)}>Younger sister</button>
                    <button className="fnButton" name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
                    <br/>

                    <button name="son" onClick={e => this.props.onClick(e.target.name)}>Son</button>
                    <button name="daughter" onClick={e => this.props.onClick(e.target.name)}>Daughter</button><br/>

                </div>
            );
        }
    }
}


export default KeyPadComponent;
