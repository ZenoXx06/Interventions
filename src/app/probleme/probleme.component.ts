import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms'
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private typeproblemeService: TypeproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['',[VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['',[Validators.maxLength(50), Validators.required]],
      typeProbleme: ['', Validators.required], 
      notification: ['NePasMeNotifier'],
      courrielGroup: this.fb.group({
          courriel: [{value: ''}],
          courrielConfirmation: [{value: ''}],
        }),
      telephone: [{value: ''}],
    });

    this.typeproblemeService.obtenirTypesProbleme()
        .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
                   error => this.errorMessage = <any>error); 
  }

  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('courrielGroup');      
    const telephoneControl = this.problemeForm.get('telephone');

    courrielControl.clearValidators();
    courrielControl.reset()
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset()
    telephoneControl.disable();

    if (typeNotification === 'ParCourriel') {   
      courrielControl.setValidators([Validators.required]);      
      courrielControl.enable();  
      courrielConfirmationControl.setValidators([Validators.required]);              
      courrielConfirmationControl.enable();                      
      }   
      else
      {
        if(typeNotification === 'ParMessageTexte')
        {
          telephoneControl.setValidators([Validators.required]);      
          telephoneControl.enable();         
        }
      }
    courrielControl.updateValueAndValidity();   
    courrielConfirmationControl.updateValueAndValidity();         
    telephoneControl.updateValueAndValidity();  
  }
  save(): void {
  }
}
