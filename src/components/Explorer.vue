<template>
  <div class="container mx-auto">
    <div class="h-32 py-4 text-center">
      <input
        v-model="userLocation"
        class="border bg-blue border-blue-dark text-white mr-2 p-2 rounded w-1/2"
        disabled="disabled"
        placeholder="Find venues near you"
      />
      <input
        v-model="radius"
        class="border bg-blue border-blue-dark text-white mr-2 p-2 rounded"
        min=250
        max=10000
        placeholder="Radius (meters)"
        type="number"
      />
      <select
        v-model="section"
        class="appearance-none bg-blue border border-blue-dark hover:border-grey mr-2 p-2 pr-8 rounded shadow text-white"
      >
        <option :value="null">section</option>
        <option
          v-for="(section, i) of sections"
          :key="i"
        >
          {{ section }}
        </option>
      </select>
      <button
        class="bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 border border-grey-light rounded shadow"
        :disabled="loading"
        @click="getUserLocation"
      >
        Explore
      </button>
    </div>
    <div v-if="loading" class="text-center text-white">Loading...</div>
    <carousel :perPageCustom="[[768, 3], [1024, 4]]">
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
import { explore } from "./../api";
import { Carousel, Slide } from "vue-carousel";
import VenueCard from "@/components/VenueCard";

const sections = [
  "food",
  "drinks",
  "coffee",
  "shops",
  "arts",
  "outdoors",
  "sights",
  "trending"
];

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
    radius: 2000,
    section: null,
    sections,
    userLocation: null
  }),
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

      explore({
        latitude,
        longitude,
        radius: this.radius,
        section: this.section
      })
        .then(r => r.json())
        .then(({ response }) => {
          this.items = response.groups[0].items;
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
