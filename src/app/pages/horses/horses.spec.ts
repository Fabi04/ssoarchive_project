import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Horses } from './horses';

describe('Horses', () => {
  let component: Horses;
  let fixture: ComponentFixture<Horses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Horses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Horses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
