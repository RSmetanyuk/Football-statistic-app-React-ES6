import React from 'react'

export class Championships extends React.Component {
	constructor() {
        super();
        this.state={championships:[]};
    }
    componentDidMount(){
        fetch('https://footballbet.com.ua/api/championships/')
        .then((result) => {
          return result.json();
        }).then((answer) => {
          this.setState({championships: answer.result});
        })
    }
    
    render() {
        return(
          <ul>
            {
                this.state.championships.length ? 
                this.state.championships.map(championship=><li key={championship.id_championship}>{championship.name}</li>) : 
                <li>Loading...</li>
            }
        </ul>
     )
    }
}