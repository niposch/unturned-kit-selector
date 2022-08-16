import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitListItemComponent } from './kit-list-item.component';

describe('KitListItemComponent', () => {
  let component: KitListItemComponent;
  let fixture: ComponentFixture<KitListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
