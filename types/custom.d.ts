interface Item {
  slug: Slug
  title: string
  blurb: string
  tags: Tag[]
  image?: string
  imageAlt?: string
  priority?: number
}

interface Community {
  id: string
  name: string
  alt_name?: string
  region: string
  country: string
  latitude: number
  longitude: number
  type: string
}

type CommunityValue = Community | undefined

interface MapLayer {
  id: string
  title: string
  subtext?: string
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

type LatLngValue = LatLng | undefined

type PlaceType = 'community' | 'latLng' | undefined
