<template>
  <div class="max-w-sm rounded overflow-hidden shadow-md m-1 bg-blue-lighter">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">
        {{ venue.name }}
      </div>
      <p class="text-grey-darker text-base">
        {{ venue.location.address }}
      </p>
    </div>
    <div class="px-6 py-4">
      <span
        v-for="(cat, i) in venue.categories"
        :key="i"
        class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2"
      >
        {{ cat.shortName }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VenueCard",
  props: {
    venue: Object
  }
};
</script>
