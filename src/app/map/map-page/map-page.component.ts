import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { map, Observable, of, Subscription } from 'rxjs';
import { Listing, MapService } from '../map.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { PublishListingModalComponent } from '../publish-listing-modal/publish-listing-modal.component';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isMobile$: Observable<boolean>;
  map!: mapboxgl.Map;
  listings: Observable<Listing[]> = of([]);
  isViewMap = true;
  sub = new Subscription();

  breakpointSubscription = new Subscription();
  constructor(
    private responsive: BreakpointObserver,
    private mapService: MapService,
    public dialog: Dialog
  ) {
    this.isMobile$ = this.responsive
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map((result: BreakpointState): boolean => result.matches));

    this.listings = this.mapService.getListings();
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

  openDialog() {
    const dialogRef = this.dialog.open(PublishListingModalComponent, {
      minWidth: '400px',
      data: {
        plant: undefined
      }
    });
    this.sub.add(
      dialogRef.componentInstance?.reloadListings.subscribe(() => {
        // this.listings = this.mapService.getListings();
      })
    );
  }

  ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
  }
}
