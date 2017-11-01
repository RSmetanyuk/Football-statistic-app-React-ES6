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
        const tableRows = this.state.championships.map(function(championship) {
            return (
                <tr key={championship.id_championship}>
                    <td>
                        <img src="https://footballbet.com.ua/table/embl/{championship.image}" height="35" width="35" />
                        {championship.name}
                    </td>
                </tr>
            );
        });

        return(
            <table className="table-championships">
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        )
    }
}