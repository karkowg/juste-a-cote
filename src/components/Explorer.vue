<template>
  <div class="container mx-auto">
    <div class="px-1 py-4 text-center">
      <input
        v-model="userLocation"
        class="border bg-blue border-blue-dark text-white mr-2 p-2 rounded w-1/2 opacity-75"
        disabled="disabled"
        placeholder="Find venues near you"
      />
      <input
        v-model="radius"
        class="border bg-blue border-blue-dark hover:border-grey text-white mr-2 p-2 rounded"
        min=0.5
        max=1000
        step="0.5"
        placeholder="Radius (in km)"
        type="number"
      />
      <select
        v-model="section"
        class="appearance-none bg-blue border border-blue-dark hover:border-grey mr-2 p-2 pr-8 rounded shadow text-white"
      >
        <option :value="null">Section</option>
        <option
          v-for="(section, i) of sections"
          :key="i"
        >
          {{ section }}
        </option>
      </select>
      <button
        class="bg-white hover:bg-grey-lightest hover:text-blue-dark text-grey-darkest font-semibold py-2 px-4 border border-grey-light rounded shadow"
        :disabled="loading"
        @click="getUserLocation"
      >
        Explore
      </button>
    </div>
    <div v-if="loading" class="px-1 py-4 text-center text-white">Loading...</div>
    <carousel :per-page-custom="[[576, 2], [1024, 3]]">
      <slide
        v-for="(item, i) of items"
        :key="i"
      >
        <venue-card
          :venue="item.venue"
        ></venue-card>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { explore, extractItemsOrderedByClosest, sections } from "./../api";
import { Carousel, Slide } from "vue-carousel";
import VenueCard from "@/components/VenueCard";

export default {
  name: "Explorer",
  components: {
    Carousel,
    Slide,
    VenueCard
  },
  data: () => ({
    items: [],
    coords: null,
    loading: false,
    radius: null,
    section: null,
    sections,
    userLocation: null
  }),
  computed: {
    optionals() {
      const optionals = {};

      if (this.radius) {
        optionals["radius"] = this.radius * 1000;
      }

      if (this.section) {
        optionals["section"] = this.section;
      }

      return optionals;
    }
  },
  methods: {
    getUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          this.coords = position.coords;
        });
      }
    }
  },
  watch: {
    coords({ latitude, longitude }) {
      this.loading = true;
      this.items = [];

      explore({ latitude, longitude, ...this.optionals })
        .then(r => r.json())
        .then(({ response }) => {
          this.items = extractItemsOrderedByClosest(response);
          this.userLocation = response.headerFullLocation;
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    }
  }
};
</script>
