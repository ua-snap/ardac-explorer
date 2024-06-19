<template>
  <div>
    <div v-if="store.showBetaNotice" class="notification is-warning my-5">
      <button class="delete" @click="hideNotification"></button>
      Thanks for checking out this tool! This is a public beta, which means that
      we&rsquo;re still gathering feedback, testing data outputs and fixing
      bugs. Please contact
      <a href="mailto:uaf-snap-data-tools@alaska.edu"
        >uaf-snap-data-tools@alaska.edu</a
      >
      if you encounter any bugs or would like to provide feedback.
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
  max-width: 800px;
  margin: 0 auto;
}
</style>
