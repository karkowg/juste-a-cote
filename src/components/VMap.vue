<template>
  <div class="mx-2 shadow" style="height: 200px;">
    <l-map
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer
        url="//{s}.tile.osm.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      ></l-tile-layer>
      <l-marker
        v-if="center"
        :draggable="true"
        :lat-lng="[center.lat, center.lng]"
        @update:latLng="$emit('update:center', $event)"
      >
        <l-tooltip>You!</l-tooltip>
      </l-marker>
      <l-marker
        v-if="venue"
        :lat-lng="[venue.location.lat, venue.location.lng]"
      >
        <l-tooltip>{{ venue.name }}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet";

const attribution =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

export default {
  name: "VMap",
  components: {
    LMap,
    LMarker,
    LTileLayer,
    LTooltip
  },
  props: {
    center: Object,
    venue: Object
  },
  data: () => ({
    attribution,
    zoom: 13
  })
};
</script>

<style scoped>
.leaflet-container {
  border-radius: 0.25rem;
}
</style>
