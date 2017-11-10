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
                const modArr = arr.filter(item => item.name !=='').map(item => {
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
            const SecondName = () => {        
                return teams[index].second_name ? <p><strong>Друга назва: </strong>{teams[index].second_name}</p> : ''
            }
            const City = () => {        
                return teams[index].city ? <p><strong>Місто: </strong>{teams[index].city}</p> : ''
            }
            const FoundationYear = () => {        
                return teams[index].foundation_year > 0 ? <p><strong>Рік заснування: </strong>{teams[index].foundation_year}</p> : ''
            }
            const Coach = () => {        
                return teams[index].coach ? <p><strong>Тренер: </strong>{teams[index].coach}</p> : ''
            }
            const President = () => {        
                return teams[index].president ? <p><strong>Президент: </strong>{teams[index].president}</p> : ''
            }
            const HomeStadion = () => {        
                return teams[index].home_stadion ? <p><strong>Домашній стадіон: </strong>{teams[index].home_stadion}</p> : ''
            }
            const IdChampionship = () => {        
                return teams[index].id_championship ? 
                <p><strong>ID чемпіонату: </strong><Link to={'/championships/' + teams[index].id_championship}>{teams[index].id_championship}</Link></p> : ''
            }
            const OffSite = () => {        
                return teams[index].off_site ? <p><strong>Веб сторінка: </strong><a href={teams[index].off_site}>{teams[index].off_site}</a></p> : ''
            }
            function createMarkup() {
                return {__html: teams[index].title};
              }
            const Title = () => {        
                return teams[index].title.length < 10  ? '' : <div><p><strong>Трофеї: </strong></p><div dangerouslySetInnerHTML={createMarkup()} /></div>
            }
            return (
                <div className="container left">
                    <img src={teams[index].emblema} />
                    <p><strong>Назва команди: </strong>{teams[index].name}</p>
                    <SecondName />
                    <City />
                    <FoundationYear />
                    <Coach />
                    <President />
                    <HomeStadion />
                    <IdChampionship />
                    <OffSite />
                    <Title />
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