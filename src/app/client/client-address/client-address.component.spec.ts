import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddressComponent } from './client-address.component';

describe('ClientAddressComponent', () => {
  let component: ClientAddressComponent;
  let fixture: ComponentFixture<ClientAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
