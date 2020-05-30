import React, {Component} from 'react';

class FunctionKeyComponent extends Component {


    render() {

        if (this.props.isWaitReset) {
            return (
                <div className="righthalf">
                    <button className="fnButton" name="audio" onClick={e => this.props.onClick(e.target.name)}>🗣</button>
                    <br/>
                    <button className="fnButton" name="back" onClick={e => this.props.onClick(e.target.name)}>←</button>
                    <br/>
                    <button className="fnButton" name="C" onClick={e => this.props.onClick(e.target.name)}>C</button>
                    <br/>
                    <button className="fnButton" style={{height: "120px"}} name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
                    <br/>
                </div>
            );
        } else {
            return (
                <div className="righthalf">
                    <button className="fnButton" name="audio" onClick={e => this.props.onClick(e.target.name)}>🗣</button>
                    <br/>
                    <button className="fnButton" name="back" onClick={e => this.props.onClick(e.target.name)}>←</button>
                    <br/>
                    <button className="fnButton" name="C" onClick={e => this.props.onClick(e.target.name)}>C</button>
                    <br/>
                    <button className="fnButton" style={{height: "120px"}} name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
                    <br/>
                </div>
            );
        }
    }
}


export default FunctionKeyComponent;
