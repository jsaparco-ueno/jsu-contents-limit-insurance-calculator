import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export class InsuranceCalc extends Component {
    static displayName = InsuranceCalc.name;

    constructor(props) {
        super(props);
        this.state = { categories: [], loading: true };
    }

    componentDidMount() {
        this.populateInsuranceCalcData();
    }

    handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }
        else {
            fetch('InsuranceCalc/delete/'+id, {
                method: 'delete'
            }).then( () => {
                this.populateInsuranceCalcData()
            });
        }
    }

    renderInsuranceCalcTable(categories) {
        if (categories.length > 0) {
            return (
                    <table className='table' aria-labelledby="tabelLabel">
                    <tbody>
                    {categories.map(category => { return (
                        <table key={category.id}>
                            <tr>
                                <td colSpan='2'>{category.name}</td>
                                <td>{category.items.map(item => item.value).reduce(function (a,b) { return a + b})}</td>
                            </tr>
                            {category.items.map(item => { return (
                                <tr key={item.id}>
                                    <td>&nbsp;</td>
                                    <td>{item.name}</td>
                                    <td>{item.value}</td>
                                    <td><a className="action" onClick={() => {this.handleDelete(item.id);}}><FontAwesomeIcon icon ={faTrashAlt} /></a></td>
                                </tr>
                            )})}
                        </table>);
                    })}
                    </tbody>
                </table>
            )
        }
        else {
            return (<p>There are no items to display.</p>)
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderInsuranceCalcTable(this.state.categories);

        return (
            <div>
                <h1 id="tablelabel">Contents Limit Insurance Calculator</h1>
                <p>A web app that sums a list of items' values.</p>
                <hr/>
                {contents}
            </div>
        );
    }

    async populateInsuranceCalcData() {
        const response = await fetch('InsuranceCalc');
        const data = await response.json();
        this.setState({ categories: data, loading: false });
    }
}