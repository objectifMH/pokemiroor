import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  map;

  @Input()
  total: number;

  total_map;

  @Input()
  url_img: string;

  url_map: string;

  @Input()
  name: string;

  @Input()
  color: any;

  markers;

  comedieMtp = {
    lat: 43.610769,
    long: 3.876716
  };

  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  constructor(private util: UtilService, private pokeService: PokemonService) {
  }

  ngAfterViewInit() {
     this.createMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.url_img && changes.url_img.currentValue !== this.url_map) {
      this.url_map = changes.url_img.currentValue;
      console.log("Dans ngOnChabges");
      this.mutliMarker();
    }
  }

  createMap() {
    const zoomLvl = 12;
    this.map = L.map('id_map', {
      center: [this.comedieMtp.lat, this.comedieMtp.long],
      zoom: zoomLvl
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 8,
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.map);
    this.mutliMarker();
  }

  mutliMarker() {
    this.deleteMarker();
    this.markers = [];
    
    if (this.total > 0) {

      for (let i = 0; i < this.total; i++) {
        let rand1 = this.util.getRandomInt(5, -5);
        let rand2 = this.util.getRandomInt(5, -5);

        let lat = (this.comedieMtp.lat + rand2 * 0.01);
        let long = (this.comedieMtp.long + rand1 * 0.01);

        let marker = L.marker([lat, long], { icon: this.smallIcon });
        this.markers = [...this.markers, marker];
      }

      let name_pokemon = this.name.charAt(0).toUpperCase() + this.name.substring(1).toLowerCase();
      if ( this.markers.length > 0 && this.map)
      this.markers.map((mark, index) => {
        mark.addTo(this.map)
          .bindPopup("<h4>" + name_pokemon + " <span style='font-size:15px'>("+(index+1)+")</span></h4><img src='" + this.url_map + "' style='max-width:90px; max-height:90px; ' >")
          .openPopup();
        console.log(index);
      });
    }
  }

  deleteMarker(){
    if ( this.markers && this.markers.length > 0)
    {
      this.markers.map( marker => {
        this.map.removeLayer(marker);
      });
    }
  }
}
