import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowElmComponent } from './shadow-elm.component';

describe('ShadowElmComponent', () => {
  let component: ShadowElmComponent;
  let fixture: ComponentFixture<ShadowElmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadowElmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShadowElmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
