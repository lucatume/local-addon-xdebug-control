module.exports = {
	toArray: function ( output ) {
		if ( ! output.length ) {
			return []
		}

		if ( ! Array.isArray( output ) ) {
			output = [output]
		}

		const items = output.map( function ( entry ) {
			return entry.split( /\n/ ).map( function ( m ) {
				return m.replace( /[\x00-\x1F\x7F-\x9F]/g, '' ).trim()
			} ).filter( function ( el ) {
				return el.length > 0
			} )
		} )

		const all = []

		items.forEach( function ( arr ) {
			arr.forEach( function ( e ) {
				all.push( e )
			} )
		} )

		return all
	},
	silence: function ( command ) {
		return `${command} >/dev/null 2>&1`
	},
}