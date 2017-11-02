import React from 'react'
import { Link } from 'react-router-dom'
import { GetApi } from './GetApi.jsx';

export class ChampionshipsAll extends React.Component {
	constructor() {
        super();
        this.state={championships:[]};
    }

    componentDidMount(){
        !this.state.championships.length &&
        GetApi('championships').then((arr) => {
            const modArr = arr.map(championship => {
                championship.image = "https://footballbet.com.ua/table/embl/" + championship.image;
                return championship
            });
            this.setState({championships: modArr})
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