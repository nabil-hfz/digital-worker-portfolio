import { AbstractControl, ValidationErrors } from "@angular/forms";

export class LinkValidators {

    static shouldBeValidLink(control: AbstractControl): ValidationErrors | null {
        let link = control.value 
        if (!LinkValidators.isValidUrl(link)) {
            return {
                validLink: true
            };
        }
        return null;

    }

      static  isValidUrl(url: string): boolean {
        const pattern = new RegExp('^(https?:\\/\\/)?' +  
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +  
            '((\\d{1,3}\\.){3}\\d{1,3}))' +  
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +  
            '(\\?[;&a-z\\d%_.~+=-]*)?' +  
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!pattern.test(url);
    }

}