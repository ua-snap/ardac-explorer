type ItemType = "brief" | "featured" | undefined

interface Item {
  type?: ItemType
  image?: string
  imageAlt?: string
  title?: string
  blurb?: string
  tags?: string[]
  slug?: string
  fullView?: string
  priority?: number
}

interface MapLayer {
  id: string
  title: string
  source?: 'rasdaman' | undefined
  wmsLayerName: string
  style: string
  default?: boolean
  legend: string
  rasdamanConfiguration?: any
}

interface MapLayerInstance {
  mapId: string
  layer: MapLayer
}

interface LegendItem {
  color: string
  label: string
}

interface LatLng {
  lat: number
  lng: number
}
