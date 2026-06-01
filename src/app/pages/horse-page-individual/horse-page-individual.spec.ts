import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsePageIndividual } from './horse-page-individual';

describe('HorsePageIndividual', () => {
  let component: HorsePageIndividual;
  let fixture: ComponentFixture<HorsePageIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorsePageIndividual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorsePageIndividual);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
