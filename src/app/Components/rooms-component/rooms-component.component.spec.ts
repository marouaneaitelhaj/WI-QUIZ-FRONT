import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponentComponent } from './rooms-component.component';

describe('RoomsComponentComponent', () => {
  let component: RoomsComponentComponent;
  let fixture: ComponentFixture<RoomsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsComponentComponent]
    });
    fixture = TestBed.createComponent(RoomsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
