import React from 'react'
import { Link } from 'react-router-dom'
import { GetApi } from './GetApi.jsx'
import { Switch, Route } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

let loaded = [];

export class Championships extends React.Component {
	constructor() {
        super();
        this.state = {
            loading: false,
            championships: loaded
        };
    }

    componentWillMount(){
        if (!this.state.championships.length) {
            this.setState({ loading: true });
            GetApi('championships').then((arr) => {
                const modArr = arr.map(item => {
                    item.image = "https://footballbet.com.ua/table/embl/" + item.image;
                    item.link = <Link to={'/championships/' + item.title}>
                        <img src={item.image} height="35" width="35" />
                        {item.name}
                        </Link>
                    return item
                });                
                this.setState({
                    championships: modArr,
                    loading: false
                });
            })   
        }     
    }

    componentWillUnmount() {
        loaded = this.state.championships;
    }
        
    render() {
        const {championships} = this.state;
        const championshipsAll = () => {
            if (this.state.loading) {
                return <h2>Loading...</h2>;
            }
            const colFormatter = (cell, row) => {
                return (
                    <Link to={'/championships/' + row.title}>
                        <img src={row.image} height="35" width="35" />
                        {cell}
                    </Link>
                )
            }
            return (
                <div>
                    <BootstrapTable data={ championships } pagination className='table-championships'>
                        <TableHeaderColumn dataField='name' dataFormat={ colFormatter } isKey={ true }>Championships</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }
        const championship = (props) => {
            const champ = (item) => item.title === props.match.params.name;
            const index = championships.findIndex(champ);
            if (this.state.loading) {
                return <h2>Loading...</h2>;
            }
            return (
                <div className="container left">
                    <img src={championships[index].image} />
                    <p>ID чемпіонату: {championships[index].id_championship}</p>
                    <p>Чемпіонат: {championships[index].name}</p>
                    <p>Назва чемпіонату: {championships[index].sename}</p>
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