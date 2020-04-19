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

    static renderInsuranceCalcTable(categories) {
        return (
            <table className='table' aria-labelledby="tabelLabel">
                <thead>
                {/* <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Delete</th>
                </tr> */}
                </thead>
                <tbody>
                
                {categories.map(category => { return (
                    <table key={category.id}>
                        <tr>
                            <td colSpan='2'>{category.name}</td>
                            <td>{category.items.map(item => item.value).reduce(function (a,b) { return a + b})}</td>
                        </tr>
                        {category.items.map(item => {
                            return (<tr key={item.key}>
                                <td>&nbsp;</td>
                                <td>{item.name}</td>
                                <td>{item.value}</td>
                                <td><FontAwesomeIcon icon ={faTrashAlt} /></td>
                            </tr>);
                        })}
                    </table>);
                })}
                </tbody>
            </table>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : InsuranceCalc.renderInsuranceCalcTable(this.state.categories);

        return (
            <div>
                <h1 id="tablelabel">Contents Limit Insurance Calculator</h1>
                <p>A web app that sums a list of items' values.</p>
                {contents}
            </div>
        );
    }

    async populateInsuranceCalcData() {
        const response = await fetch('InsuranceCalc');
        const data = await response.json();
        console.log(data);
        this.setState({ categories: data, loading: false });
    }
}