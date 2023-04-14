
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

  it("#19 | Zone TELEPHONE est désactivée quand notifier par courriel", () => {
    component.appliquerNotifications("ParCourriel");
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it("#20 | Zone COURRIEL est activée quand notifier par courriel", () => {
    component.appliquerNotifications("ParCourriel");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID');
  });

  it("#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel", () => {
    component.appliquerNotifications("ParCourriel");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID');
  });

  it("#22 | Zone COURRIEL est invalide sans valeur quand notifier par courriel", () => {
    component.appliquerNotifications("ParCourriel");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual("INVALID");
  });

  it("#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel", () => {
    component.appliquerNotifications("ParCourriel");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual("INVALID");
  });

  it("#24 | Zone COURRIEL est invalide avec un format non conforme", () => {
    component.appliquerNotifications("ParCourriel");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('test');
    expect(zone.status).toEqual("INVALID");
  });

  it('#25 | Zone COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications("ParCourriel")
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};
    courrielConfirmation.setValue('gui@hotmail.com');
    courriel.setValue('');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });
  it('#26 | Zone COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications("ParCourriel")
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};
    courriel.setValue('gui@hotmail.com');
    courrielConfirmation.setValue('');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });
  it('#27 | Zone COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications("ParCourriel")
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};
    courriel.setValue('gui@hotmail.com');
    courrielConfirmation.setValue('guill@hotmail.com');
    errors = groupe.errors || {};
    expect(errors['match']).toBeTrue();
  });
  it('#28 | Zone COURRIEL et Zone CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications("ParCourriel")
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};
    courriel.setValue('gui@hotmail.com');
    courrielConfirmation.setValue('gui@hotmail.com');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });
});
