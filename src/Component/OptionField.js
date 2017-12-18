const PropTypes = require( 'prop-types' )
const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

module.exports = function ( context ) {
	const React = context.React
	const Option = require( './Option' )( context )

	return function OptionField( props ) {
		const propTypes = {
			value: PropTypes.any,
			default: PropTypes.any,
			options: PropTypes.arrayOf( PropTypes.shape( {
				value: PropTypes.any.isRequired,
				label: PropTypes.string.isRequired,
			} ) ),
			title: PropTypes.string.isRequired,
		}

		assertPropTypes( propTypes, props )

		const value = props.value || props.default || props.options[0].value

		const options = props.options.map( function ( option ) {
			return (
				<Option className='OptionField__Option'
				        value={option.value}
				        key={option.value.toString()}
				        label={option.label}/>
			)
		} )

		return (
			<li className="TableListRow OptionField">
				<strong><span className='OptionField__Title'>{props.title}</span></strong>
				<div style={{display: 'flex'}}>
					<select name={props.name} id={props.name} className='OptionField__Options' defaultValue={value}>
						{options}
					</select>
				</div>
			</li>
		)
	}
}