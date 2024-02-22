// This is just some sample code for working with 
// a (temporary!) spreadsheet version of some items.
// Below it sketches an example that outputs JSON,
// and also a version that just outputs type defs for Slugs.
const csvFile = './input.csv'
const csv = require('csvtojson')
var out = []
csv({
	ignoreColumns: /What/, // ignore the "What should it offer?" column
})
	.fromFile(csvFile)
	.subscribe(json => {
		return new Promise((resolve, reject) => {
			// Generate most of the needed JSON in bulk
			/*
			let tags = json.tags.split(',')
			tags.forEach((tag, i) => {
				tags[i] = tag.trim()
			})
			console.log({
				slug: json.slug,
				title: json.title,
				blurb: json.blurb,
				tags: tags,
			},',')
			*/

			/* Regenerate valid slugs */
			console.log('| "' + json.slug + '"')

			resolve()
		})
	})
