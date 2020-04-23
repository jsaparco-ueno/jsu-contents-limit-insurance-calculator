import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export class InsuranceCalc extends Component {
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
                        <thead>
                            <tr>
                                <th>Category or Item Name</th>
                                <th colSpan='2'>Value</th>
                            </tr>
                        </thead>
                    {categories.filter(category => category.items.length > 0).map(category => 
                        <tbody key={category.id}>
                            <tr>
                                <td>{category.name}</td>
                                <td>{category.items.map(item => item.value).reduce(function (a,b) { return a + b})}</td>
                            </tr>
                            {category.items.map(item => { return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.value}</td>
                                    <td><button className="action" onClick={() => {this.handleDelete(item.id);}}><FontAwesomeIcon icon ={faTrashAlt} /></button></td>
                                </tr>
                            )})}
                        </tbody>
                    )}
                    <tbody>
                        <tr>
                            <td>TOTAL</td>
                            <td>
                                {categories.map(category => {
                                    if (category.items.length > 0) { 
                                        return (category.items.map(item => item.value).reduce(function (a,b) { return a + b}))
                                    }
                                    else return 0
                                }).reduce(function(a,b){return a+b})}
                            </td>
                        </tr>
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
                {contents}
                <AddNewItemForm categories = {this.state.categories} afterHandleAdd = {() => {this.populateInsuranceCalcData()}} />
            </div>
        );
    }

    async populateInsuranceCalcData() {
        const response = await fetch('InsuranceCalc');
        const data = await response.json();
        this.setState({ categories: data, loading: false });
    }
}

class AddNewItemForm extends Component {
    handleSubmit(event, afterHandleAdd) {
        event.preventDefault();
        const data = new FormData();
        var item = {
            Name: event.target.Name.value,
            Value: event.target.Value.value,
            CategoryId: event.target.Category.value,
        }
        data.append('metadata',JSON.stringify(item))
        fetch('InsuranceCalc/add', {
            method: 'post',
            body: data
        }).then(response => {
            if (response.ok) {
                document.getElementsByName('add-item-form')[0].reset();
                afterHandleAdd();
            }
        });
    }

    render() {
        return (
            <form name='add-item-form' onSubmit={(e) => this.handleSubmit(e, this.props.afterHandleAdd)} >
                <div className="form-group row">                    
                    <input className="form-control" type="text" name="Name" defaultValue="New Item Name" required />
                    <input className="form-control" type="text" name="Value" defaultValue="0" required />
                    <select className="form-control" data-val="true" name="Category" defaultValue="" required>
                        <option value="">Select a Category...</option>
                        {this.props.categories.map(category =>
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                    </select>
                    <button type="submit" className="btn btn-default">Add</button>
                </div>
            </form>
        )
    }
}
