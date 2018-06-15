import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from './Article'
import { connect } from 'react-redux'
import { updateItemUnits, deleteArticle } from './../AC'
import { FormattedNumber } from 'react-intl';

class ArticleList extends Component{
    constructor(props){
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            text: '',
            isPromo:false
        }
    }
    static propTypes = {
        articles: PropTypes.array.isRequired,
        handlePomo: PropTypes.func,
        handleChange: PropTypes.func,
        totalAmount: PropTypes.func,
        totalUnits: PropTypes.func,
    }
    
    renderArticleHead() {
        return (
            <thead>
                <tr>
                    <th>Товар</th>
                    <th>Описание</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Удалить</th>
                </tr>
            </thead>
        )
    }
    renderArticlPromo() {
        if(this.state.isPromo){
            return(
                <tr className="promo">
                    <td colSpan={1}>Промокод: </td>
                    <td colSpan={2}><FormattedNumber value="1800" />  руб.</td>
                </tr>
            )
        }        
    }
    renderArticleForm() {
        return(
            <form className="form">
                <label htmlFor="prom">Есть промкод?</label>
                <div>
                    <input
                        onChange={this.handleChange}
                        value={this.state.text}
                        type="text"
                        ref="prom" 
                        id="prom" 
                        name="text"
                        placeholder="Введите промокод"
                        required
                     />
                    <button onClick={ this.handlePomo } >Применить</button>
                </div>
            </form>
        )
    }
    handlePomo = (e) => {
        const value = this.refs.prom.value
        e && e.preventDefault && e.preventDefault()
        if(this.state.isPromo === false && value === '123456') {
            this.setState({
                text: '',
                isPromo: true
            })
        }

    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleDeleteFromCart(id) {
        this.props.deleteArticle(id)
    }
    handleDeductUnit(id) {
        let units = -1
        this.props.updateItemUnits({id, units})
    }
    handleAddUnit(id) {
        let units = 1
        this.props.updateItemUnits({id, units})
    }


	render(){
        const { articles } = this.props
        const articleElements = articles.map((art) => {
            return (
                <Article key={art.id} 
                    article={art}
                    onAddUnit={this.handleAddUnit.bind(this, art.id)}
                    onDeductUnit={this.handleDeductUnit.bind(this, art.id)}
                    handleDeleteFromCart={this.handleDeleteFromCart.bind(this, art.id)}
                />
            )
        })


		return(
			<table className="table">
                { this.renderArticleHead() }
                <tbody>
					{ articleElements }
                    <tr>
                        <td rowSpan={4} colSpan={2}>{this.renderArticleForm()}</td>
                        <td colSpan={1}>Итого: </td>
                        <td colSpan={2}>{ this.totalUnits(articles) }</td>
                    </tr>
                    <tr>
                        <td colSpan={1}>Сумма заказа: </td>
                        <td colSpan={2}><FormattedNumber value={ this.totalAmount(articles) } />  руб.</td>
                    </tr>
			        { this.renderArticlPromo() }
                    <tr>
                        <td colSpan={1}>Всего: </td>
                        <td colSpan={2}><FormattedNumber value={ this.totalAmount(articles) - (this.state.isPromo ? 1800 : 0) } />  руб.</td>
                    </tr>
                </tbody>
			</table>
		)
	}

    totalAmount(cartArray, promo = false) {
        return cartArray.reduce((acum, item) => {
            acum += item.price * item.units
            return acum
        }, 0);
    }

    totalUnits(cartArray) {
        return cartArray.reduce((acum, item) => {
            acum += item.units
            return acum
        }, 0);
    }
}

export default connect(state => ({
    articles: state.articles
}), { updateItemUnits, deleteArticle })(ArticleList)
