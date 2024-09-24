import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateJwtComponent } from './validate-jwt.component';

describe('ValidateJwtComponent', () => {
  let component: ValidateJwtComponent;
  let fixture: ComponentFixture<ValidateJwtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateJwtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidateJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
