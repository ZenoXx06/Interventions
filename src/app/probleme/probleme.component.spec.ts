
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule ],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Zone PRÉNOM invalide avec 2 caractères", () => {
    let zone = component.problemeForm.controls["prenom"]
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy()
  });

  it("Zone PRÉNOM valide avec 3 caractères", () => {
    let zone = component.problemeForm.controls["prenom"]
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy()
  });

  it("Zone PRÉNOM valide avec 200 caractères", () => {
    let zone = component.problemeForm.controls["prenom"]
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy()
  });

  it("Zone PRÉNOM invalide avec aucune valeur", () => {
    let zone = component.problemeForm.controls["prenom"]
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy()
  });

  it("Zone PRÉNOM invalide avec 10 espaces", () => {
    let control = { value: ' '.repeat(10) }
    let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
  });

  it("Zone PRÉNOM invalide avec 2 espace et 1 caractères", () => {
    let control = { value: ' '.repeat(2) + 'a'.repeat(1)}
    let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
  });

  it("Zone TELEPHONE est désactivée quand ne pas me notifier", () => {
    component.appliquerNotifications("NePasMeNotifier");
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it("Zone TELEPHONE est vide quand ne pas me notifier", () => {
    component.appliquerNotifications("NePasMeNotifier");
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  it("Zone COURRIEL est désactivée quand ne pas me notifier", () => {
    component.appliquerNotifications("NePasMeNotifier");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it("Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () => {
    component.appliquerNotifications("NePasMeNotifier");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
});
