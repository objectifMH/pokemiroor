import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  map;

  @Input()
  total: number;

  comedieMtp = {
    lat: 43.610769,
    long: 3.876716
  };

  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  constructor(private util: UtilService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createMap();
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
    //this.total = this.util.getRandomInt(20);
    let tab_marker = [];
  
    if( this.total > 0)
    {
      for ( let i=0; i< this.total; i++)
      {
        let rand1 = this.util.getRandomInt(5, -5);
        let rand2 = this.util.getRandomInt(5, -5);
        
        let lat = (this.comedieMtp.lat + rand2 * 0.01);
        let long = (this.comedieMtp.long + rand1 * 0.01);
        //console.log("Total : ", this.total, lat, long);
        
        let marker = L.marker([lat, long], {icon: this.smallIcon});
        tab_marker = [...tab_marker, marker];
      }
      let cmpt = 0;
      tab_marker.map( mark => {
          mark.addTo(this.map).bindPopup(cmpt+" : "+mark._latlng.lat+" , "+mark._latlng.lng).openPopup();
          cmpt++;
        }
        );
      //console.log(tab_marker);
    }
  }

}
