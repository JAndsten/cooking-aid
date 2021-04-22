import React from 'react';

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{ingredient:"butter", amount:"500", originalAmount:"500", measurement:"g", originalMeasurement:"g"},],
            ingredient: '',
            amount: '',
            originalAmount: '', // for changing portion size
            measurement: '',
            originalMeasurement: '', // for converting back to its original measurement
            portionSize: '1'
            };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //######### Addition related functions #########
    handleSubmit = () => {
        let newRecipe = {
            ingredient: this.state.ingredient,
            amount: this.state.amount,
            originalAmount: this.state.amount,
            measurement: this.state.measurement,
            originalMeasurement: this.state.measurement
        };

        let newItems = this.state.items;
        newItems.push(newRecipe);
        this.setState({
            items: newItems
        });
    }

    //######### List related functions #########
    handleDelete(i) {
        let deleteList = this.state.items;

        deleteList.splice(i, 1);

        this.setState({
            item: deleteList
        });
    }

    /* CURRENTLY OBSOLETE. Needed if table is modified.
    handleItemChange(i, event) {
        let newItems = this.state.items;
      
        newItems[i] = event.target.value;
      
        this.setState({
          items: newItems
        });
      }
      */

    // ######### Portion size functions #########
    handleSizeChange = (event) => {
        let newSize = event.target.value;
        let newSizeList = [...this.state.items];
        for (let i = 0; i < newSizeList.length; i++) {
            newSizeList[i].amount = newSizeList[i].originalAmount * newSize;
        };
        this.setState({
            items: newSizeList,
            portionSize: event.target.value
        });
    }

    // ######### Measurement system functions #########
    handleSystem = (event) => {
        let newSystem = event.target.value;
        let newSystemList = [...this.state.items];
        let i;
        if (newSystem === 'metric') {
            for (i = 0; i < newSystemList.length; i++) {
                if (newSystemList[i].measurement === 'cups') {
                    newSystemList[i].amount *= 237;
                    newSystemList[i].originalAmount *= 237;
                    newSystemList[i].measurement = 'ml';
                } else if (newSystemList[i].measurement === 'ozF') {
                    newSystemList[i].amount *= 29.6;
                    newSystemList[i].originalAmount *= 29.6;
                    newSystemList[i].measurement = 'ml';
                } else if (newSystemList[i].measurement === 'ozW') {
                    newSystemList[i].amount *= 28.35;
                    newSystemList[i].originalAmount *= 28.35;
                    newSystemList[i].measurement = 'g';
                } else if (newSystemList[i].measurement === 'lbs') {
                    newSystemList[i].amount *= 454;
                    newSystemList[i].originalAmount *= 454;
                    newSystemList[i].measurement = 'g';
                } else if (newSystemList[i].measurement === 'tsp') {
                    newSystemList[i].amount *= 5;
                    newSystemList[i].originalAmount *= 5;
                    newSystemList[i].measurement = 'ml';
                } else if (newSystemList[i].measurement === 'tbsp') {
                    newSystemList[i].amount *= 15;
                    newSystemList[i].originalAmount *= 15;
                    newSystemList[i].measurement = 'ml';
                }
            }
        } else if (newSystem === 'imperial') {
            for (i = 0; i < newSystemList.length; i++) {
                if (newSystemList[i].measurement === 'ml') {
                    if (newSystemList[i].originalMeasurement === 'cups') { // If converting back to original measurements
                        newSystemList[i].amount /= 237;
                        newSystemList[i].originalAmount /= 237;
                        newSystemList[i].measurement = 'cups';
                    } else if (newSystemList[i].originalMeasurement === 'tbsp') {
                        newSystemList[i].amount /= 15;
                        newSystemList[i].originalAmount /= 15;
                        newSystemList[i].measurement = 'tbsp';
                    } else if (newSystemList[i].originalMeasurement === 'tsp') {
                        newSystemList[i].amount /= 5;
                        newSystemList[i].originalAmount /= 5;
                        newSystemList[i].measurement = 'tsp';
                    } else if (newSystemList[i].originalMeasurement === 'ozF') {
                        newSystemList[i].amount /= 29.6;
                        newSystemList[i].originalAmount /= 29.6;
                        newSystemList[i].measurement = 'ozF';
                    } else if (newSystemList[i].amount < 15) { // If converting for the first time
                        newSystemList[i].amount /= 5;
                        newSystemList[i].originalAmount /= 5;
                        newSystemList[i].measurement = 'tsp';
                    } else if (newSystemList[i].amount <= 120) {
                        newSystemList[i].amount /= 15;
                        newSystemList[i].originalAmount /= 15;
                        newSystemList[i].measurement = 'tbsp';
                    } else {
                        newSystemList[i].amount /= 237;
                        newSystemList[i].originalAmount /= 237;
                        newSystemList[i].measurement = 'cups';
                    }
                }  else if (newSystemList[i].measurement === 'g') { // If converting back to original measurements
                    if (newSystemList[i].originalMeasurement === 'ozW') {
                        newSystemList[i].amount /= 28.35;
                        newSystemList[i].originalAmount /= 28.35;
                        newSystemList[i].measurement = 'ozW';
                    } else if (newSystemList[i].originalMeasurement === 'lbs') {
                        newSystemList[i].amount /= 454;
                        newSystemList[i].originalAmount /= 454;
                        newSystemList[i].measurement = 'lbs';
                    } else if (newSystemList[i].amount < 250) { // If converting for the first time
                        newSystemList[i].amount /= 28.35;
                        newSystemList[i].originalAmount /= 28.35;
                        newSystemList[i].measurement = 'ozW';
                    } else {
                        newSystemList[i].amount /= 454;
                        newSystemList[i].originalAmount /= 454;
                        newSystemList[i].measurement = 'lbs';
                    }
                }
            }
        }
        this.setState({
            items: newSystemList
        });
    }

    renderRows() {
        var context = this;

        return  this.state.items.map(function(o, i) {
            return (
                <tr key={"item-" + i}>
                    <td>
                        <p>{o.ingredient}</p>
                    </td>
                    <td>
                        <p>{Math.round(o.amount * 100)/100}</p>
                    </td>
                    <td>
                        <p>{o.measurement}</p>
                    </td>
                    <td>
                        <button
                        onClick={context.handleDelete.bind(context, i)}
                        >
                        Delete
                        </button>
</td>
                </tr>
              );
            });
    }

    render() {

        // New entry form
        return (
            <div>
                {/* Portion size */}
                <div onChange={this.handleSizeChange}>
                    <label>Portion size:</label>
                    <input type="radio" value="0.1" name="size" />10%
                    <input type="radio" value="0.5" name="size" />50%
                    <input type="radio" value="1" name="size" />100%
                    <input type="radio" value="1.5" name="size" />150%
                    <input type="radio" value="2" name="size" />200%
                </div>
                {/* Measurement system */}
                <div>
                    <button type="button" value="metric" onClick={this.handleSystem}>Metric</button>
                    <button type="button" value="imperial" onClick={this.handleSystem}>Imperial</button>
                </div>
                {/* New ingredient form */}
                <h5>New recipe</h5>
                <form>
                    <label>
                        Ingredient:
                        <input type="text" placeholder="Ingredient" name="ingredient" value={this.state.ingredient} onChange={this.handleChange.bind(this)} />
                    </label>
                    <label>
                        Amount:
                        <input type="number" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange.bind(this)} />
                    </label>
                    <label>
                        Measurement:
                        <select name="measurement" value={this.state.value} onChange={this.handleChange}>
                            <option>Pick one</option>
                            <option value="g">grams (g)</option>
                            <option value="ozW">weight ounces (oz)</option>
                            <option value="ml">millilitres (ml)</option>
                            <option value="ozF">fluid ounces (oz)</option>
                            <option value="lbs">pounds (lbs)</option>
                            <option value="cups">cups</option>
                            <option value="tsp">teaspoons (tsp)</option>
                            <option value="tbsp">tablespoons (tbsp)</option>
                        </select>
                    </label>
                    <button style={{ 'margin': '10px' }} type="button" className="btn btn-primary" onClick={this.handleSubmit.bind()}>Submit ingredient</button>
                </form>
                {/* Table of ingredients */}
                <div>
                <table>
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Amount</th>
                            <th>Measurement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
                </div>
            </div>
        )
        }

}

export default AddRecipe;