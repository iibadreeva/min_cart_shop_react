import React, { Component } from 'react'
import { FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types'



class Article extends Component {
	static propTypes = {
		article: PropTypes.shape({
			price: PropTypes.number.isRequired,
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			onDeductUnit: PropTypes.fun,
			onAddUnit: PropTypes.fun,
			handleDeleteFromCart: PropTypes.fun,
		}).isRequired,
	}

	render(){
		const { article } = this.props
		return (
			<tr className="article">
				<td><img src={ article.img } alt={ article.title }/></td>
				<td>
					<div>{ article.title }</div>
					<div className="article__code">Код: { article.code }</div>
					<div>Размер: { article.size }</div>
					<div>Цвет: { article.color }</div>
				</td>
				<td>
					<span onClick={() => this.props.onDeductUnit()} className="glyphicon glyphicon-minus"></span>
					<span className="glyphicon-units">{ article.units }</span>
					<span onClick={() => this.props.onAddUnit()} className="glyphicon glyphicon-plas" ></span>
				</td>
				<td>
					<FormattedNumber value={ article.price } />  руб.
				</td>
				<td>
					<span onClick={() => this.props.handleDeleteFromCart()} className="glyphicon glyphicon-remove"></span>
				</td>
			</tr>
		)
	}

}

export default Article