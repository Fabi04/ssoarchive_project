import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collectibles } from './collectibles';

describe('Collectibles', () => {
  let component: Collectibles;
  let fixture: ComponentFixture<Collectibles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Collectibles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Collectibles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
