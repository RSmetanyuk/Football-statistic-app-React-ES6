import React from 'react'
import { Link } from 'react-router-dom'
import { GetApi } from './GetApi.jsx'
import { Switch, Route } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

let loaded = [];

export class Matches extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            matches: loaded
        };
    }

    componentWillMount(){
        if (!this.state.matches.length) {
            this.setState({ loading: true });
            GetApi('matches').then((arr) => {             
                const modArr = arr.map(item => {
                    item.teamPair = item.firstTeam + ' - ' + item.secondTeam; 
                    item.score = item.firstTeamGoal + ' - ' + item.secondTeamGoal;
                    return item 
                });                
                this.setState({
                    matches: modArr,
                    loading: false
                });
            })   
        }     
    }
    
    componentWillUnmount() {
        loaded = this.state.matches;
    }

    render() {
        const {matches, loading} = this.state;
        
        const matchesAll = () => {
            if (loading) {
                return <h2>Loading...</h2>;
            }
            const colFormatter = (cell, row) => {
                return (
                    <Link to={'/matches/' + row.idMatch}> { cell } </Link>
                )
            }
            return (
                <div>
                    <BootstrapTable data={ matches } className='table-matches'>
                        <TableHeaderColumn dataField='teamPair' dataFormat={ colFormatter } 
                        filter={ { type: 'TextFilter', delay: 500 } }
                        isKey={ true }>Matches</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }

        const match = (props) => {
            if (loading) {
                return <h2>Loading...</h2>;
            }
            const colFormatter = (cell, row) => {
                return (
                    <Link to={'/championships/'}> { cell } </Link>
                )
            }
            const colFormatter2 = (cell, row) => {
                return (
                    <div>
                        <Link to={'/teams/' + row.idFirstTeam}> { row.firstTeam } </Link>
                        {' ' + cell + ' '}
                        <Link to={'/teams/' + row.idSecondTeam}> { row.secondTeam } </Link>
                    </div>
                )
            }
            return (
                <div>
                    <BootstrapTable data={ matches.filter(item => item.idMatch === props.match.params.idMatch) } className='table-match'>
                        <TableHeaderColumn dataField='date' width='17%'>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='title' dataFormat={ colFormatter } width='36%'>Championship</TableHeaderColumn>
                        <TableHeaderColumn dataField='score' dataFormat={ colFormatter2 } isKey={ true }>Match</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }

        return (
            <Switch>
                <Route exact path='/matches' component={matchesAll}/>
                <Route exact path='/matches/:idMatch' component={match}/>
            </Switch>
        )
     }
}