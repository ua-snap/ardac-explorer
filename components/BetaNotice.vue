<template>
  <div>
    <div
      v-if="store.showBetaNotice"
      class="beta-notice notification is-warning is-size-4 my-5"
    >
      <button class="delete" @click="hideNotification"></button>
      Thanks for trying out this site! This is a
      <strong>public pre-release</strong>. There are bugs, dead links and
      missing content as we work towards a beta! We&rsquo;re still gathering feedback, testing data
      outputs and fixing bugs. Please contact
      <a href="mailto:uaf-snap-data-tools@alaska.edu"
        >uaf-snap-data-tools@alaska.edu</a
      >
      if you would like to provide feedback.
    </div>
  </div>
</template>

<script setup>
const store = useStore()
const hideNotification = () => {
  store.showBetaNotice = false
}
</script>

<style lang="scss" scoped>
.beta-notice.notification.is-warning {
  margin: 0 auto;
  background-color: lch(95.426% 58.15 81.243);
}
</style>
