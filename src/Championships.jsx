import React from 'react'
import { Link } from 'react-router-dom'
import { GetApi } from './GetApi.jsx'
import { Switch, Route } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

let loaded = [];
let savedSortOrder = '';
let savedSizePerPage = 10;
let savedPage = 1

export class Championships extends React.Component {
	constructor() {
        super();
        this.state = {
            loading: false,
            championships: loaded,
            sortName: 'name',
            sortOrder: savedSortOrder,
            sizePerPage: savedSizePerPage,
            page: savedPage
        };
    }

    componentWillMount(){
        if (!this.state.championships.length) {
            this.setState({ loading: true });
            GetApi('championships').then((arr) => {
                const modArr = arr.map(item => {
                    item.image = "https://footballbet.com.ua/table/embl/" + item.image;
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
        savedSortOrder = this.state.sortOrder;
        savedSizePerPage = this.state.sizePerPage;
        savedPage = this.state.page;
    }

    onSortChange(sortName, sortOrder) {
        this.setState({
            sortName,
            sortOrder
        });
    }

    onPageChange(page, sizePerPage) {
        const currentIndex = (page - 1) * sizePerPage;
        this.setState({
            page,
            sizePerPage
        });
    }
        
    render() {
        const {championships, loading} = this.state;
        
        const championshipsAll = () => {
            if (loading) {
                return <h2>Loading...</h2>;
            }
            const options = {
                sizePerPageList: [10, { text: 'All', value: championships.length } ],
                sizePerPage: this.state.sizePerPage,  //which size per page you want to locate as default
                page: this.state.page,
                sortName: this.state.sortName,
                sortOrder: this.state.sortOrder,
                onSortChange: this.onSortChange.bind(this),
                onPageChange: this.onPageChange.bind(this)
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
                    <BootstrapTable data={ championships } options={options} pagination condensed className='table-championships'>
                        <TableHeaderColumn dataField='name' dataFormat={ colFormatter } 
                        filter={ { type: 'TextFilter', delay: 1000 } }
                        isKey={ true } dataSort={ true }>Championships</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }
        
        const championship = (props) => {
            const champ = (item) => props.match.params.name % 1 === 0 ? 
                item.id_championship === props.match.params.name : 
                item.title === props.match.params.name;   
            const index = championships.findIndex(champ);
            if (this.state.loading) {
                return <h2>Loading...</h2>;
            }
            const ChampionshipSename = () => {        
                return championships[index].sename ? <p>Назва чемпіонату: {championships[index].sename}</p> : ''
            }
            return (
                <div className="container left">
                    <img src={championships[index].image} />
                    <p>ID чемпіонату: {championships[index].id_championship}</p>
                    <p>Чемпіонат: {championships[index].name}</p>
                    <ChampionshipSename />
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