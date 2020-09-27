import React, { Component } from 'react'
import './calculator.scss'

export default class Calculator extends Component {


    state = {
        outputArr: [],
        formulaArr: [],
    }

    handleInput = (input) => {
        if (input === 'AC') {
            this.setState({
                outputArr: [],
                formulaArr: [],
            })
        }
        else if (input === '=') {
            console.log(this.state.formulaArr)

            // xử lý tạo mảng phép tính cuối cùng
            let finalFormulaArr;

            if ((/[-+x/]/).test(this.state.outputArr)) {
                if ((/[-+x/]/).test(this.state.formulaArr[this.state.formulaArr.length - 1])) {
                    this.state.formulaArr.pop();
                    this.setState({
                        formulaArr: [...this.state.formulaArr],
                        outputArr: [input],
                    })
                }
                else {
                    this.setState({
                        outputArr: [input],
                    })
                }
                finalFormulaArr = [...this.state.formulaArr];
            }
            else {
                let currentValue = this.state.outputArr.join('');
                this.setState({
                    formulaArr: [...this.state.formulaArr, currentValue],
                    outputArr: [input],
                })
                finalFormulaArr = [...this.state.formulaArr, currentValue];
            }


            // xử lý kết quả
            // let finalFormulaArr = [...this.state.formulaArr];
            console.log(finalFormulaArr)
            while ((/[x/]/).test(finalFormulaArr)) {
                let index = finalFormulaArr.findIndex(chac => chac === "/" || chac === 'x');
                let currentResult;
                if (finalFormulaArr[index - 2] === '-') {
                    if (finalFormulaArr[index + 1] === '-') {
                        switch (finalFormulaArr[index]) {
                            case 'x':
                                currentResult = Math.round(parseFloat('-' + finalFormulaArr[index - 1]) * parseFloat('-' + finalFormulaArr[index + 2]) * 10000) / 10000;
                                finalFormulaArr.splice(index - 2, 5 , currentResult);
                                break;
                            case '/':
                                currentResult = Math.round(parseFloat('-' + finalFormulaArr[index - 1]) / parseFloat('-' + finalFormulaArr[index + 2]) * 10000) / 10000;
                                finalFormulaArr.splice(index - 2, 5 , currentResult);
                                break;
                        }
                    }
                    else {
                        switch (finalFormulaArr[index]) {
                            case 'x':
                                currentResult = Math.round(parseFloat('-' + finalFormulaArr[index - 1]) * parseFloat(finalFormulaArr[index + 1]) * 10000) / 10000;
                                finalFormulaArr.splice(index - 2, 4 , currentResult);
                                break;
                            case '/':
                                currentResult = Math.round(parseFloat('-' + finalFormulaArr[index - 1]) / parseFloat(finalFormulaArr[index + 1]) * 10000) / 10000;
                                finalFormulaArr.splice(index - 2, 4 , currentResult);
                                break;
                        }
                    }
                }
                else {
                    if (finalFormulaArr[index + 1] === '-') {
                        switch (finalFormulaArr[index]) {
                            case 'x':
                                currentResult = Math.round(parseFloat(finalFormulaArr[index - 1]) * parseFloat('-' + finalFormulaArr[index + 2]) * 10000) / 10000;
                                finalFormulaArr.splice(index - 1, 4 , currentResult);
                                break;
                            case '/':
                                currentResult = Math.round(parseFloat(finalFormulaArr[index - 1]) / parseFloat('-' + finalFormulaArr[index + 2]) * 10000) / 10000;
                                finalFormulaArr.splice(index - 1, 4 , currentResult);
                                break;
                        }
                    }
                    else {
                        switch (finalFormulaArr[index]) {
                            case 'x':
                                currentResult = Math.round(parseFloat(finalFormulaArr[index - 1]) * parseFloat(finalFormulaArr[index + 1]) * 10000) / 10000;
                                finalFormulaArr.splice(index - 1, 3 , currentResult);
                                break;
                            case '/':
                                currentResult = Math.round(parseFloat(finalFormulaArr[index - 1]) / parseFloat(finalFormulaArr[index + 1]) * 10000) / 10000;
                                finalFormulaArr.splice(index - 1, 3 , currentResult);
                                break;
                        }
                    }
                }
            }

            // xử lý phép cộng
            let stillHaveAdd = true;

            while (stillHaveAdd) {
                let currentResult;
                let positiveIndex = finalFormulaArr.findIndex(chac => chac === '+');
                if (positiveIndex !== -1) {
                    if (finalFormulaArr[positiveIndex + 1] === '-') {
                        if (finalFormulaArr[positiveIndex - 2] === '-') {
                            currentResult = parseFloat('-' + finalFormulaArr[positiveIndex - 1]) + parseFloat('-' + finalFormulaArr[positiveIndex + 2]);
                            finalFormulaArr.splice(positiveIndex - 2, 5 , currentResult);
                        }
                        else {
                            currentResult = parseFloat(finalFormulaArr[positiveIndex - 1]) + parseFloat('-' + finalFormulaArr[positiveIndex + 2]);
                            finalFormulaArr.splice(positiveIndex - 1, 4 , currentResult);
                        }
                    }
                    else {
                        if (finalFormulaArr[positiveIndex - 2] === '-') {
                            currentResult = parseFloat( '-' + finalFormulaArr[positiveIndex - 1]) + parseFloat(finalFormulaArr[positiveIndex + 1]);
                            finalFormulaArr.splice(positiveIndex - 2, 4 , currentResult);
                        }
                        else {
                            currentResult = parseFloat(finalFormulaArr[positiveIndex - 1]) + parseFloat(finalFormulaArr[positiveIndex + 1]);
                        finalFormulaArr.splice(positiveIndex - 1, 3 , currentResult);
                        }
                    }
                }
                else {
                    stillHaveAdd = false;
                }
            }
            

            let stillHaveMinus = true;
            while (stillHaveMinus) {
                let index = finalFormulaArr.findIndex(chac => chac === '-');
                if (index !== -1) {
                    finalFormulaArr.splice(index, 2 , '-' + finalFormulaArr[index + 1]);
                }
                else {
                    stillHaveMinus = false;
                }
            }

            let finalResult = finalFormulaArr.reduce((result, value) => {
                result = result + parseFloat(value);
                return result;
            },0)

            let currentValue = this.state.outputArr.join('');
            this.setState({
                formulaArr: [...this.state.formulaArr, currentValue, input],
                outputArr: [finalResult],
            })

        }
        else if ((/[-+x/]/).test(input)) {
            if ((/[=]/).test(this.state.formulaArr)) {
                this.setState({
                    formulaArr: [...this.state.outputArr],
                    outputArr: [input],
                })
            }
            else {
                if ((/[-+x/]/).test(this.state.outputArr)) {
                    if ((/[-+x/]/).test(this.state.formulaArr[this.state.formulaArr.length - 1])) {
                        if (input === '-') {
                            // do nothing
                        }
                        else if (this.state.formulaArr[this.state.formulaArr.length - 1] !== input) {
                            this.state.formulaArr.pop();
                            this.setState({
                                formulaArr: [...this.state.formulaArr],
                                outputArr: [input],
                            })
                        }
                    }
                    else {
                        if ((/[+x/]/).test(this.state.outputArr[this.state.outputArr.length - 1]) && input === '-') {
                            let currentValue = this.state.outputArr.join('');
                            this.setState({
                                formulaArr: [...this.state.formulaArr, currentValue],
                                outputArr: [input],
                            })
                        }
                        else if (this.state.outputArr[this.state.outputArr.length - 1] !== input) {
                            this.setState({
                                outputArr: [input],
                            })
                        }
                    }
                }
                else {
                    if (this.state.outputArr.length === 0) {
                        if (input === '-') {
                            this.setState({
                                outputArr: [input],
                            })
                        }
                    }
                    else {
                        let currentValue = this.state.outputArr.join('');
                        this.setState({
                            formulaArr: [...this.state.formulaArr, currentValue],
                            outputArr: [input],
                        })
                    }
    
                }
            }
            
        }
        else if (input === '.') {
            let index = this.state.outputArr.findIndex(chac => chac === '.');
            if (index === -1) {
                this.setState({
                    outputArr: [...this.state.outputArr, input],
                })
            }
        }
        else {
            if (input === '0') {
                if (this.state.outputArr.length === 0 || (this.state.outputArr.length === 1 && this.state.outputArr[0] === '0')) {
                    // do nothing
                }
                else {
                    if ((/[-+x/]/).test(this.state.outputArr[this.state.outputArr.length - 1])) {
                        this.setState({
                            formulaArr: [...this.state.formulaArr, ...this.state.outputArr],
                            outputArr: [input],
                        })
                    }
                    else {
                        this.setState({
                            outputArr: [...this.state.outputArr, input],
                        })
                    }
                }
            }
            else {
                if ((/[-+x/]/).test(this.state.outputArr[this.state.outputArr.length - 1])) {
                    this.setState({
                        formulaArr: [...this.state.formulaArr, ...this.state.outputArr],
                        outputArr: [input],
                    })
                }
                else if (this.state.outputArr.length === 1 && this.state.outputArr[0] === '0') {
                    this.setState({
                        outputArr: [input],
                    })
                }
                else {
                    this.setState({
                        outputArr: [...this.state.outputArr, input],
                    })
                }
            }
        }
    }



    render() {
        return (
            <div className="calculator">
                <div className="formulaScreen">{this.state.formulaArr.length !== 0 ? this.state.formulaArr.join('') + this.state.outputArr.join('') : (this.state.outputArr.length !== 0 ? this.state.outputArr.join('') : '')}</div>
                <div className="outputSreen" id="display">{this.state.outputArr.length !== 0 ? this.state.outputArr.join('') : 0}</div>
                <div>
                    <div className="row mx-0">
                        <button className="jumbo col-6" id="clear" value="AC" style={{ background: 'rgb(172, 57, 57)' }} onClick={(e) => this.handleInput(e.target.value)}>AC</button>
                        <button className="col-3" id="divide" value="/" style={{ background: 'rgb(102, 102, 102)' }} onClick={(e) => this.handleInput(e.target.value)}>/</button>
                        <button className="col-3" id="multiply" value="x" style={{ background: 'rgb(102, 102, 102)' }} onClick={(e) => this.handleInput(e.target.value)}>x</button>
                        <button className="col-3" id="seven" value={7} onClick={(e) => this.handleInput(e.target.value)}>7</button>
                        <button className="col-3" id="eight" value={8} onClick={(e) => this.handleInput(e.target.value)}>8</button>
                        <button className="col-3" id="nine" value={9} onClick={(e) => this.handleInput(e.target.value)}>9</button>
                        <button className="col-3" id="subtract" value='-' style={{ background: 'rgb(102, 102, 102)' }} onClick={(e) => this.handleInput(e.target.value)}>-</button>
                        <button className="col-3" id="four" value={4} onClick={(e) => this.handleInput(e.target.value)}>4</button>
                        <button className="col-3" id="five" value={5} onClick={(e) => this.handleInput(e.target.value)}>5</button>
                        <button className="col-3" id="six" value={6} onClick={(e) => this.handleInput(e.target.value)}>6</button>
                        <button className="col-3" id="add" value="+" style={{ background: 'rgb(102, 102, 102)' }} onClick={(e) => this.handleInput(e.target.value)}>+</button>
                    </div>
                    <div className="row mx-0">
                        <div className="col-9 px-0">
                            <button className="col-4" id="one" value={1} onClick={(e) => this.handleInput(e.target.value)}>1</button>
                            <button className="col-4" id="two" value={2} onClick={(e) => this.handleInput(e.target.value)}>2</button>
                            <button className="col-4" id="three" value={3} onClick={(e) => this.handleInput(e.target.value)}>3</button>
                            <button className="jumbo col-8" id="zero" value={0} onClick={(e) => this.handleInput(e.target.value)}>0</button>
                            <button className="col-4" id="decimal" value="." onClick={(e) => this.handleInput(e.target.value)}>.</button>
                        </div>
                        <div className="col-3 px-0">
                            <button id="equals" value="=" style={{ background: 'rgb(0, 68, 102)', position: 'absolute', height: '100%', width: '100%' }} onClick={(e) => this.handleInput(e.target.value)}>=</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
