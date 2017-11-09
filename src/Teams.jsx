import React from 'react'
import { Link } from 'react-router-dom'
import { GetApi } from './GetApi.jsx'
import { Switch, Route } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

let loaded = [];

export class Teams extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            teams: loaded
        };
    }

    componentWillMount(){
        if (!this.state.teams.length) {
            this.setState({ loading: true });
            GetApi('teams').then((arr) => {
                const modArr = arr.map(item => {
                    item.emblema === '' ? item.emblema = "/img/no_logo.png" :
                    item.emblema = "https://footballbet.com.ua/teams/embl/" + item.emblema; 
                    return item
                });                
                this.setState({
                    teams: modArr,
                    loading: false
                });
            })   
        }     
    }

    componentWillUnmount() {
        loaded = this.state.teams;
    }

    render() {
        const {teams, loading} = this.state;
        const teamsAll = () => {
            if (loading) {
                return <h2>Loading...</h2>;
            }
            const colFormatter = (cell, row) => {
                return (
                    <Link to={'/teams/' + row.id_teams}>
                        <img src={row.emblema} height="35" width="35" />
                        {cell}
                    </Link>
                )
            }
            return (
                <div>
                    <BootstrapTable data={ teams } search pagination className='table-teams'>
                        <TableHeaderColumn dataField='name' dataFormat={ colFormatter }
                        isKey={ true }>Teams</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }
 
        const team = (props) => {
            const tea = (item) => item.id_teams === props.match.params.id_teams;
            const index = teams.findIndex(tea);
            if (loading) {
                return <h2>Loading...</h2>;
            }

            return (
                <div className="container left">
                    <img src={teams[index].emblema} />
                    <p><strong>Назва команди: </strong>{teams[index].name}</p>
                </div>              
            )
        }
        
        return (
            <Switch>
                <Route exact path='/teams' component={teamsAll}/>
                <Route exact path='/teams/:id_teams' component={team}/>
            </Switch>
        )
     }
}