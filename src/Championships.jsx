import React from 'react'
import { Link } from 'react-router-dom'
import { GetApi } from './GetApi.jsx'
import { Switch, Route } from 'react-router-dom'

let state ={championships:[]};

export class Championships extends React.Component {
	constructor() {
        super();
        this.state=state;
    }

    componentWillMount(){
        !this.state.championships.length &&
        GetApi('championships').then((arr) => {
            const modArr = arr.map(item => {
                item.image = "https://footballbet.com.ua/table/embl/" + item.image;
                return item
            });
            this.setState({championships: modArr})
            //console.log('GetApi')
        })
        //console.log('componentDidMount')
    }

    componentWillUnmount() {
        state = this.state;
        //console.log('componentWillUnmount')
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
        const championship = (props) => {
            const champ = (item) => item.title === props.match.params.name;
            const index = this.state.championships.findIndex(champ); 
           
            return (
                <div className="container left">
                    <img src={this.state.championships[index].image} />
                    <p>ID чемпіонату: {this.state.championships[index].id_championship}</p>
                    <p>Чемпіонат: {this.state.championships[index].name}</p>
                    <p>Назва чемпіонату: {this.state.championships[index].sename}</p>
                </div>              
            )
        }
        return (
            <Switch>
                <Route exact path='/championships' component={championshipsAll}/>
                <Route exact path='/championships/:name' component={championship}/>
            </Switch>
        )
    }
}