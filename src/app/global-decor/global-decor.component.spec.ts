import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDecorComponent } from './global-decor.component';

describe('GlobalDecorComponent', () => {
  let component: GlobalDecorComponent;
  let fixture: ComponentFixture<GlobalDecorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalDecorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalDecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
