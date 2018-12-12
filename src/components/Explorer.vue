<template>
  <div class="container mx-auto">
    <div class="h-4 text-center text-white">
      <span v-if="userLocationName">
        @ {{ userLocationName }}
      </span>
      <span v-else>
        Tap explore or drag the marker to find venues near you!
      </span>
    </div>
    <div class="px-1 pt-4 text-center flex flex-col md:flex-row">
      <input
        v-model="radius"
        class="border bg-blue border-blue-dark hover:border-grey text-white m-1 p-2 rounded shadow flex-1"
        min=0.5
        max=1000
        step="0.5"
        placeholder="Radius (km)"
        type="number"
      />
      <select
        v-model="section"
        class="appearance-none bg-blue border border-blue-dark hover:border-grey m-1 p-2 rounded shadow text-white flex-1"
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
        class="bg-white hover:bg-grey-lightest hover:text-blue-dark text-grey-darkest font-semibold py-2 px-4 m-1 border border-grey-light rounded shadow flex-1"
        :disabled="loading"
        @click="getUserLocation"
      >
        Explore
      </button>
    </div>

    <!-- map -->
    <v-map
      :center="userCoords"
      :venue="selectedVenue"
      @update:center="updateUserCoords"
    ></v-map>

    <!-- loading -->
    <div v-if="loading" class="px-1 py-4 text-center text-white">Loading...</div>

    <!-- venues -->
    <div class="mx-1">
      <carousel :per-page-custom="[[576, 2], [1024, 3]]">
        <slide
          v-for="(item, i) of items"
          :key="i"
        >
          <venue-card
            :venue="item.venue"
            @click="selectedVenue = $event"
          ></venue-card>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { explore, extractItemsOrderedByClosest, sections } from "./../api";
import { Carousel, Slide } from "vue-carousel";
import VenueCard from "@/components/VenueCard";
import VMap from "@/components/VMap";

export default {
  name: "Explorer",
  components: {
    Carousel,
    Slide,
    VenueCard,
    VMap
  },
  data: () => ({
    items: [],
    loading: false,
    radius: null,
    selectedVenue: null,
    section: null,
    sections,
    userCoords: {
      lat: 52.368,
      lng: 4.9036
    },
    userLocationName: null,
    zoom: 13
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
    updateUserCoords({ lat, lng }) {
      this.userCoords = { lat, lng };
    },
    getUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          this.updateUserCoords({
            lat: coords.latitude,
            lng: coords.longitude
          });
        });
      }
    }
  },
  watch: {
    userCoords({ lat, lng }) {
      this.loading = true;
      this.items = [];

      explore({ lat, lng, ...this.optionals })
        .then(r => r.json())
        .then(({ response }) => {
          this.items = extractItemsOrderedByClosest(response);
          this.userLocationName = response.headerFullLocation;
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
