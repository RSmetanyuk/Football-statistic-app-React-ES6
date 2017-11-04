import React from 'react'
import { Link } from 'react-router-dom'
import { GetApi } from './GetApi.jsx'
import { Switch, Route } from 'react-router-dom'

export class Championships extends React.Component {
	constructor() {
        super();
        this.state={championships:[]};
    }

    componentDidMount(){
        !this.state.championships.length &&
        GetApi('championships').then((arr) => {
            const modArr = arr.map(item => {
                item.image = "https://footballbet.com.ua/table/embl/" + item.image;
                return item
            });
            this.setState({championships: modArr})
        })
    }
        
    render() {
        const championshipsAll = () => {
            return (
                <table className="table-championships">
                <tbody>
                    {
                        this.state.championships.map(championship => (
                            <tr key={championship.id_championship}>
                                <td>
                                    <Link to={'/championships/' + championship.title}>
                                        <img src={championship.image} height="35" width="35" />
                                        {championship.name}
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            )
        }
        const championship = () => {
            return (
                <p>Опис чемпіонату</p>
            )
        }
        return (
            <Switch>
                <Route exact path='/championships' component={championshipsAll}/>
                <Route path='/championships/:name' component={championship}/>
            </Switch>
        )
    }
}