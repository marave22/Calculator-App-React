import React from 'react';
import Input from "./Input";
import './Button.css';

class Button extends React.Component {
    state = {
        value: null,
        displayValue: '0',
        operand: false,
        operator: null
    };

    handleClick = (digit) => {
        if (this.state.operand) {
            this.setState({
                displayValue: String(digit),
                operand: false
            })
        } else {
            this.setState({
                displayValue: this.state.displayValue === '0' ? String(digit) : this.state.displayValue + digit
            })
        }
    };

    handleDot = () => {
        const newValue = this.state.displayValue;

        if (this.state.operand) {
            this.setState({
                displayValue: '.',
                operand: false
            })
        } else {
            if (newValue.indexOf('.') === -1) {
                this.setState({
                    displayValue: newValue + '.',
                    operand: false
                });
            }
        }
    };


    handlePercentage = () => {
        const newValue = parseFloat(this.state.displayValue);

        this.setState({
            displayValue: String(newValue/100)
        })
    };

    handleSign = () => {
        const newValue = this.state.displayValue;
        if (newValue.charAt(0) === '-') {
            this.setState({
                displayValue: newValue.substr(1)
            });
        } else {
            this.setState({
                displayValue: '-' + newValue
            });
        }
    };

    handleOperation = (nextOperator) => {
        const nextValue = parseFloat(this.state.displayValue);
        const operations = {
            '/': (prevValue, nextValue) => prevValue / nextValue,
            '*': (prevValue, nextValue) => prevValue * nextValue,
            '+': (prevValue, nextValue) => prevValue + nextValue,
            '-': (prevValue, nextValue) => prevValue - nextValue,
            '=': (prevValue, nextValue) => nextValue
        };

        if (this.state.value === null) {
            this.setState({
                value: nextValue
            })
        } else if (this.state.operator) {
            const currentValue = this.state.value || 0;
            const computedValue = operations[this.state.operator](currentValue, nextValue);

            this.setState({
                value: computedValue,
                displayValue: String(computedValue)
            })
        }
        this.setState({
            operand: true,
            operator: nextOperator
        })
    };

    render() {
        return (
            <div className="buttons-container">
                <Input
                    className="number_input"
                    value={this.state.displayValue}/>
                <div>
                    <div className="button">
                        <button onClick={() => this.setState({ displayValue: '0' })} className="btn btn-calculate">AC</button>
                        <button onClick={this.handleSign} className="btn btn-calculate">+/-</button>
                        <button onClick={this.handlePercentage} className="btn btn-calculate">%</button>
                        <button onClick={() => this.handleOperation('/')} className="btn btn-operation">÷</button>
                    </div>
                    <div className="button">
                        <button onClick={() => this.handleClick(7)} className="btn btn-number">7</button>
                        <button onClick={() => this.handleClick(8)} className="btn btn-number">8</button>
                        <button onClick={() => this.handleClick(9)} className="btn btn-number">9</button>
                        <button onClick={() => this.handleOperation('*')}  className="btn btn-operation">x</button>
                    </div>
                    <div className="button">
                        <button onClick={() => this.handleClick(4)} className="btn btn-number">4</button>
                        <button onClick={() => this.handleClick(5)} className="btn btn-number">5</button>
                        <button onClick={() => this.handleClick(6)} className="btn btn-number">6</button>
                        <button onClick={() => this.handleOperation('-')}  className="btn btn-operation">-</button>
                    </div>
                    <div className="button">
                        <button onClick={() => this.handleClick(1)} className="btn btn-number">1</button>
                        <button onClick={() => this.handleClick(2)} className="btn btn-number">2</button>
                        <button onClick={() => this.handleClick(3)} className="btn btn-number">3</button>
                        <button onClick={() => this.handleOperation('+')}  className="btn btn-operation">+</button>
                    </div>
                    <div className="button">
                        <button onClick={() => this.handleClick(0)} className="btn-zero">0</button>
                        <button onClick={this.handleDot} className="btn btn-calculate">.</button>
                        <button onClick={() => this.handleOperation('=')}  className="btn btn-operation">=</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Button;