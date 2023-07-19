import { Component, Input } from '@angular/core';
import { Listing, MapService } from '../map.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() listing!: Listing;
  isAdditionalInfoHidden = true;

  constructor(private mapService: MapService) {}

  makeRequest(id: string) {
    this.mapService.makePlantRequest(id).subscribe();
  }
}
