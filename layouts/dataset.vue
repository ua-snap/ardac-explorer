<template>
  <div>
    <HeaderBanner />
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import HeaderBanner from '~/components/HeaderBanner'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

export default {
  components: { HeaderBanner, Navbar, Footer },
}
</script>
