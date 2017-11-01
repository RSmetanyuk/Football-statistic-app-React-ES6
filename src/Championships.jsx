import React from 'react'
import { Link } from 'react-router-dom'

export class Championships extends React.Component {
	constructor() {
        super();
        this.state={championships:[]};
    }
    componentDidMount(){
        fetch('https://footballbet.com.ua/api/championships/')
        .then((result) => {
          return result.json()
        }).then((answer) => {
            const res = answer.result.map(championship => {
                championship.image = "https://footballbet.com.ua/table/embl/" + championship.image;
                return championship
            })
          this.setState({championships: res})
        })
    }
    
    render() {
        const tableRows = this.state.championships.map(championship => (
                <tr key={championship.id_championship}>
                    <td>
                        <Link to={'/championships/' + championship.title}>
                            <img src={championship.image} height="35" width="35" />
                            {championship.name}
                        </Link>
                    </td>
                </tr>
        ));

        return(
            <table className="table-championships">
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        )
    }
}