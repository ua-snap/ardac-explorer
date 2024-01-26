interface Item {
  type: string
  image?: string
  imageAlt?: string
  title?: string
  blurb?: string
  tags?: string[]
  slug?: string
  fullView?: string
}

interface ItemsByTag {
  [key: string]: Item[]
}

interface Tag {
  name: string
  slug: string
}
