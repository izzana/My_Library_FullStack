import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosComponent } from './livros.component';

describe('LivrosComponent', () => {
  let component: LivrosComponent;
  let fixture: ComponentFixture<LivrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivrosComponent]
    });
    fixture = TestBed.createComponent(LivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
