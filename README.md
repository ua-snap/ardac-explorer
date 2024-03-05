# 🥗 ARDAC Explorer

## Setup, dev, release

```bash
nvm use lts/hydrogen
npm install
npm run dev
npm run build # release
npm run preview # preview the release
```

### Adding a new item

Determine a 'slug' for the item.  The slug is a unique but human-readable ID for the item that will be visible in the URL.

1. Add the slug for the new item to `types/slugs.d.ts`
2. Add any new tags for the new item to `types/tags.d.ts`
3. Add the item in `assets/items.ts`:
    * `slug`: the slug ID
    * `title`: the 'headline'
    * `blurb`: **short** text description, single line/paragraph, no HTML please
    * `tags`: array of tags
    * `image`: image filename, corresponds to `public/previews` folder
    * `imageAlt`: alt text for accessibility

The item is now available for use in static layouts and will be included in any pages that display all results for a tag.  Static examples:

```html
<!-- display only headline, show primary tag -->
<ItemBrief slug="indicator-ftc" showTag />

<!-- headline + blurb, no tags shown -->
<ItemText slug="sea-ice-concentration" />

<!-- headline, blurb, photo (if present), don't show tags -->
<ItemTextPicture slug="indicator-dw" />
```

To build the actual content for the item, add a Vue component in `components/global` named according to the slug pattern in CamelCase, i.e. `map-permafrost` would become `MapPermafrost`.  From the command line in the root of the project directory:

```bash
npx nuxi add component global/MapComponent
```

...which will add a Vue SFC file in the right place.  Now, that component can be accessed by clicking on the item you just created.
