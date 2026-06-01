import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collectiblemap } from './collectiblemap';

describe('Collectiblemap', () => {
  let component: Collectiblemap;
  let fixture: ComponentFixture<Collectiblemap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Collectiblemap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Collectiblemap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
