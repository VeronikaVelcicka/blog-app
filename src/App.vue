<template>
  <main>
    <div class="container">
      <router-view />
      <notifications position="bottom right" />
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss">
.container {
  max-width: 160rem;
  margin: 0 auto;
  padding: 2rem;

  @include more-than(md) {
    padding: 5rem;
  }

  @include more-than(xl) {
    padding: 10rem;
  }
}
</style>
