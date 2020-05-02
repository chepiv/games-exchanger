import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedOfferComponent } from './received-offer.component';

describe('ReceivedOfferComponent', () => {
  let component: ReceivedOfferComponent;
  let fixture: ComponentFixture<ReceivedOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
