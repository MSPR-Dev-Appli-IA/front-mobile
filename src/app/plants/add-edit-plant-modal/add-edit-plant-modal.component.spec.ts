import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPlantModalComponent } from './add-edit-plant-modal.component';

describe('AddEditPlantModalComponent', () => {
  let component: AddEditPlantModalComponent;
  let fixture: ComponentFixture<AddEditPlantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPlantModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPlantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
