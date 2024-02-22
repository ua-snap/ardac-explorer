// Take the spreadsheet here:
//
// Save it in this directory as input.csv & run.
// Emits a JSON version that can be copy/pasted
// into the ~/assets/items.ts file.
// https://docs.google.com/spreadsheets/d/1Gztm9o8JEPibPWEDwH54qBG5kwj51ILDOk_dxK6uTSY/export?format=csv&gid=1330027783
// Just for reference if needed.
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
