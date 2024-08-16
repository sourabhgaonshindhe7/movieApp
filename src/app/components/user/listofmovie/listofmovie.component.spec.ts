import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofmovieComponent } from './listofmovie.component';

describe('ListofmovieComponent', () => {
  let component: ListofmovieComponent;
  let fixture: ComponentFixture<ListofmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofmovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListofmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
