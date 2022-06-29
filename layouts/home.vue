<template>
  <div>
    <HeaderBanner />
    <nuxt />
    <Footer />
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import HeaderBanner from "~/components/HeaderBanner";
import Footer from "~/components/Footer";

export default {
  components: { HeaderBanner, Footer },
};
</script>
