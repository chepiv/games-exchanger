import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOfferComponent } from './exchange-offer.component';

describe('ExchangeOfferComponent', () => {
  let component: ExchangeOfferComponent;
  let fixture: ComponentFixture<ExchangeOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
