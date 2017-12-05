module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component
	const OptionField = require( './OptionField' )( context )
	const Button = require( './Button' )( context )
	const slugify = require( './../Utils/Strings' ).slugify

	return function FieldList( props ) {
		const options = props.fields.map( function ( field ) {
			const fieldProps = {
				title: field.title,
				name: field.name || slugify( field.title ),
				value: field.value,
				options: field.options,
			}

			return (
				<OptionField {...fieldProps} className='FieldList__Field' key={field.name}/>
			)
		} )

		return (
			<ul className='TableList Form FieldList' style={props.style}>
				{options}
				<Button text='Apply Settings' className='FieldList__Apply' onClick={props.applyWith} centered/>
			</ul>
		)
	}
}

