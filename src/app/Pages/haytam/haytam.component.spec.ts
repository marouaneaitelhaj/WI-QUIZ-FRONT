import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaytamComponent } from './haytam.component';

describe('HaytamComponent', () => {
  let component: HaytamComponent;
  let fixture: ComponentFixture<HaytamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HaytamComponent]
    });
    fixture = TestBed.createComponent(HaytamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
