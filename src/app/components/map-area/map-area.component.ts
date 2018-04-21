import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

@Component({
  selector: 'app-map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.scss']
})
export class MapAreaComponent implements OnInit {
  @Output() mapLoaded: EventEmitter<any> = new EventEmitter();
  @Input() lnglat = [4.067046, 51.171785];
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/bright-v9';
  lat = 0;
  lng = 0;
  bounds = {};
  radius = 0.01;
  radiusCircle;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 8,
      maxZoom: 12,
      center: this.lnglat
    });
    new mapboxgl.Marker(this.createMarker('', this.lnglat))
      .setLngLat(this.lnglat)
      .addTo(this.map);

//addToMap
    this.map.on('load', () => {
      this.map.addSource('circle', {
        type: 'geojson',
        data: this.radiusCircle
      });
      this.map.addLayer({
        'id': 'circle',
        'type': 'fill',
        'source': 'circle',
        'paint': {
          'fill-color': 'pink',
          'fill-opacity': 0.5
        }
      });
      this.mapLoaded.emit(true);
    });
    this.changeBounds(this.radius);
  }

  changeBounds(radius) {
    this.radiusCircle = {
      'type': 'Feature',
      'geometry': {}
    };
    this.radiusCircle = turf.buffer(turf.point(this.lnglat), radius, {steps: 100, units: 'kilometers'});
    const coordinates = this.radiusCircle.geometry.coordinates[0];
    this.bounds = coordinates.reduce(function (bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    if (this.map.getSource('circle')) {
      this.map.getSource('circle').setData(this.radiusCircle);
    }
    this.map.fitBounds(this.bounds, {
      padding: 20
    });
  }

  createMarker(image, lnglat) {
    const el = document.createElement('div');
    el.className = 'marker';
    el.className += ' no-image';
    el.style.backgroundColor = '#2C3E50';
    el.style.width = 15 + 'px';
    el.style.height = 15 + 'px';
    el.setAttribute('lat', lnglat[1]);
    el.setAttribute('lng', lnglat[0]);
    return el;
  }
}
