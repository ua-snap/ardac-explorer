<template>
  <div>
    <div
      v-if="store.showBetaNotice"
      class="notification is-warning is-size-4 my-5"
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
.notification {
  margin: 0 auto;
}
</style>
