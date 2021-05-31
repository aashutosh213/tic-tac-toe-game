import React , { Component } from 'react';
import Square from './Square';

const calculateWinner= (squares)=>{
    const lines =  [
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i<lines.length;i++){
        const a =lines[i][0];
        const b =lines[i][1];
        const c =lines[i][2];

        if(squares[a]&&
            squares[a]===squares[b]&&
            squares[a]===squares[c]
            ) {return squares[a];}
    }
    return '';
}

class Board extends Component{
    state = {
        squares : ['', '', '', '', '', '', '', '', ''],
        xIsNext: true,
        count: 0,
    }

    handleReset =()=>{
        this.setState({squares:['', '', '', '', '', '', '', '', ''],
        count: 0,
    });
    }

    handleClick=number  =>() =>{
       
        const newSquares = [ ...this.state.squares];

        if(calculateWinner(this.state.squares)||this.state.squares[number]){

            return;
        }

        newSquares[number] = this.state.xIsNext ? 'X' : 'O';

        this.setState({ squares : newSquares,
            xIsNext: !this.state.xIsNext,
            count: this.state.count+1,
        })
    }

    

    render(){
        const { squares, xIsNext, count } = this.state;
        const winner = calculateWinner(this.state.squares);
        let status;

        if(winner){
            status= `Winner: ${winner}`
        }

        return(
            
            <div className='board'>
                <div className="header">
                    Tic-Tac-Toe
                </div>
                {winner? 
                    <h1 className='gameinfo'>{status}</h1>
                    :count<=8 ?<h1 className='gameinfo'>{xIsNext?'X':'O'}'s Turn</h1>
                    :<h1 className='gameinfo'>Game Over! Its a tie! </h1>
                }
                <div className="row">
                    <Square value={squares[0]} onClick={this.handleClick(0)} />
                    <Square value={squares[1]} onClick={this.handleClick(1)}  />
                    <Square value={squares[2]} onClick={this.handleClick(2)}  />
                </div>
                <div className="row">
                    <Square value={squares[3]} onClick={this.handleClick(3)}  />
                    <Square value={squares[4]} onClick={this.handleClick(4)}  />
                    <Square value={squares[5]} onClick={this.handleClick(5)} />
                </div>
                <div className="row"> 
                    <Square value={squares[6]} onClick={this.handleClick(6)}  />
                    <Square value={squares[7]} onClick={this.handleClick(7)}  />
                    <Square value={squares[8]} onClick={this.handleClick(8)}  />
                </div>

                <div className='button'><button className='reset' onClick={this.handleReset}>Reset</button></div>
             
            </div>
        );
    }
}

export default Board;