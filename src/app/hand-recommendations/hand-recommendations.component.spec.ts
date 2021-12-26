import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandRecommendationsComponent } from './hand-recommendations.component';

describe('HandRecommendationsComponent', () => {
  let component: HandRecommendationsComponent;
  let fixture: ComponentFixture<HandRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandRecommendationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
