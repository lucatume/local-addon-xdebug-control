module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component
	const OptionField = require( './OptionField' )( context )
	const Button = require( './Button' )( context )
	const slugify = require( './../Utils/Strings' ).slugify
	const PropTypes = require( 'prop-types' )
	const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

	return function FieldList( props ) {
		const propTypes = {
			fields: PropTypes.arrayOf( PropTypes.shape( {
				title: PropTypes.string.isRequired,
				name: PropTypes.string,
				value: PropTypes.any.isRequired,
				options: PropTypes.array.isRequired,
				default: PropTypes.any.isRequired,
			} ) ),
			applyWith: PropTypes.func.isRequired,
			style: PropTypes.object,
		}

		assertPropTypes( propTypes, props )

		const options = props.fields.map( function ( field ) {
			const fieldProps = {
				title: field.title,
				name: field.name || slugify( field.title ),
				value: field.value,
				options: field.options,
				default: field.default,
			}

			return (
				<OptionField {...fieldProps} className='FieldList__Field' key={field.name}/>
			)
		} )

		const applyWith = function ( e ) {
			const target = e.target
			const selects = [...target.closest( '.FieldList' ).getElementsByTagName( 'select' )]

			if ( ! selects.length ) {
				return
			}

			let settings = {}

			selects.forEach( function ( select ) {
				settings[select.name] = select.value
			} )

			props.applyWith( settings )
		}

		return (
			<div className='FieldListWrapper'>
				<ul className='TableList Form FieldList' style={Object.assign( {maxWidth: '600px'}, props.style )}>
					{options}
					<Button text='Apply Settings' className='FieldList__Apply' onClick={applyWith} centered style={{marginTop: '.5em'}}/>
				</ul>
			</div>
		)
	}
}

