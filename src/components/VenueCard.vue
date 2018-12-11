<template>
  <div class="max-w-sm rounded overflow-hidden shadow-md m-1 bg-blue-lighter text-center">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 h-12 overflow-x-auto">
        {{ venue.name }}
      </div>
      <div>
        <p
          v-if="venue.location.address"
          class="text-base text-blue-darker"
        >
          @ {{ venue.location.address }}
        </p>
        <p
          v-else
          class="text-base text-grey-dark"
        >
          unknown address
        </p>
        <p class="mt-1 text-grey-darker text-base">
          ~ {{ getKm(venue.location.distance) }} km
        </p>
      </div>
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
  },
  methods: {
    getKm(meters) {
      return Number.parseFloat(meters / 1000).toFixed(1);
    }
  }
};
</script>
