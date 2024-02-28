// This is just some sample code for working with
// a (temporary!) spreadsheet version of some items.
// Below it sketches an example that outputs JSON,
// and also a version that outputs type defs for
// Slugs and Tags.
const csvFile = './input.csv'
const csv = require('csvtojson')
var out = []
let tagSet = new Set()

console.log('type Slug =')
csv({
  ignoreColumns: /Who|What|Notes/, // ignore unused columns
})
  .fromFile(csvFile)
  .subscribe(json => {
    return new Promise((resolve, reject) => {
      // Generate most of the needed JSON in bulk
      let tags = json.tags.split(', ')
      
      tags.forEach((tag, i) => {
        tags[i] = tag.trim()
      })
      
      console.log(
        {
          slug: json.slug,
          title: json.title,
          blurb: json.blurb,
          tags: tags,
        },
        ','
      )
      

      /* Regenerate valid slugs */
      // console.log("  | '" + json.slug + "'")

      /* Add tags to set to be output later */
      tags.forEach(tag => {
        tagSet.add(tag)
      })
      resolve()
    })
  })
  .then(() => {
    console.log('\ntype Tag =')
    tagSet.forEach(tag => {
      console.log("  | '" + tag + "'")
    })
  })
