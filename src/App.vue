<template>
  <div>
    <header>
      <h1 class="font-sans text-center text-white py-6">
        {{ name }}
      </h1>
    </header>
    <explorer/>
  </div>
</template>

<script>
import Explorer from "@/components/Explorer";

export default {
  name: "app",
  props: {
    name: String
  },
  components: {
    Explorer
  }
};
</script>
