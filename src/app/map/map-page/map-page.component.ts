import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { map, Observable, Subscription } from 'rxjs';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isMobile$: Observable<boolean>;
  map!: mapboxgl.Map;
  listings = this.mapService.getListings();
  isViewMap = true;

  breakpointSubscription = new Subscription();
  constructor(
    private responsive: BreakpointObserver,
    private mapService: MapService
  ) {
    this.isMobile$ = this.responsive
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map((result: BreakpointState): boolean => result.matches));
  }

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
