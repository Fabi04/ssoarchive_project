import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsePage } from './horse-page';

describe('HorsePage', () => {
  let component: HorsePage;
  let fixture: ComponentFixture<HorsePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorsePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorsePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
