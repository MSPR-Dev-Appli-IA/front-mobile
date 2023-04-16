import { Component, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnInit, OnDestroy {
  map!: mapboxgl.Map;

  breakpointSubscription = new Subscription();
  constructor(
    private responsive: BreakpointObserver,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.map = this.mapService.init();
    this.mapService.configure(this.map);
    this.map.resize();

    this.breakpointSubscription.add(
      this.responsive
        .observe([Breakpoints.HandsetPortrait, Breakpoints.Web])
        .subscribe(_ => this.map.resize())
    );
  }

  ngAfterViewInit() {
    this.map.resize();
  }

  ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
  }
}
