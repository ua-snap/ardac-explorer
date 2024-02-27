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

1. Add the slug for the new item to `types/slugs.d.ts`
2. Add any new tags for the new item to `types/tags.d.ts`
3. Add the item in `assets/items.ts`
4. Add a Vue component in `components/global` named according to the slug pattern in CamelCase, i.e. `map-permafrost` would become `MapPermafrost.vue`
