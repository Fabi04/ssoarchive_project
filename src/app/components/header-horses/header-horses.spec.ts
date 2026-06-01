import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHorses } from './header-horses';

describe('HeaderHorses', () => {
  let component: HeaderHorses;
  let fixture: ComponentFixture<HeaderHorses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHorses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderHorses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
