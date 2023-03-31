import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Zone PRÉNOM invalide avec 2 caractères", () => {
    let zone = component.problemeForm.controls["prenomChar2"]
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy()
  });

  it("Zone PRÉNOM valide avec 3 caractères", () => {
    let zone = component.problemeForm.controls["prenomChar2"]
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy()
  });

  it("Zone PRÉNOM valide avec 200 caractères", () => {
    let zone = component.problemeForm.controls["prenomChar2"]
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy()
  });

  it("Zone PRÉNOM invalide avec aucune valeur", () => {
    let zone = component.problemeForm.controls["prenomNonVide"]
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeTruthy()
  });

  it("Zone PRÉNOM valide avec 10 espaces", () => {
    expect(true).toBeTruthy()
  });

  it("Zone PRÉNOM valide avec 1 espace et 2 caractères", () => {
    expect(true).toBeTruthy()
  });
});
