import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResualtComponent } from './resualt.component';

describe('ResualtComponent', () => {
  let component: ResualtComponent;
  let fixture: ComponentFixture<ResualtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResualtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResualtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
