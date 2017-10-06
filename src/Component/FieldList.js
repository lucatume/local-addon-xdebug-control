module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component
	const OptionField = require( './OptionField' )( context )
	const Button = require( './Button' )( context )
	const slugify = require( './../Utils/Strings' )().slugify
	const $ = context.jQuery

	return class FieldList extends Component {
		constructor( props ) {
			super( props )
			this.fields = props.fields
			// called with setting.name and setting.value
			this.write = props.writeWith
			// called with no arguments
			this.afterWrite = props.afterWrite
			// called with name and default
			this.read = props.readWith
			this.style = props.style
		}

		parseSettings( $fieldList ) {
			let parsed = []

			$fieldList.find( 'input,select' ).each( function () {
				let $this = $( this )
				parsed.push( {name: $this.attr( 'name' ), value: $this.val()} )
			} )

			return parsed
		}

		readSettings() {
			return this.fields.map( function ( field ) {
				const name = field.name || slugify( field.title )
				this.read( name, field.default )
			}, this )
		}

		update() {
			const settings = this.parseSettings( $( this ).closest( '.FieldList' ) )

			settings.map( function ( setting ) {
				this.write( setting.name, setting.value )
			}, this )

			this.setState( this.readSettings() )

			if ( ! undefined === this.afterWrite ) {
				this.afterWrite()
			}
		}

		render() {
			const options = this.fields.map( function ( field ) {
				let name = field.name || slugify( field.title )
				const fieldProps = {
					title: field.title,
					name: name,
					value: this.read( name, field.default ),
					options: field.options,
				}

				return (
					<OptionField {...fieldProps} className='FieldList__Field'/>
				)
			}, this )

			return (
				<ul className='TableList Form FieldList' style={this.style}>
					{options}
					<Button text='Apply Settings' className='FieldList__Apply' onClick={this.update.bind( this )} centered/>
				</ul>
			)
		}
	}
}

