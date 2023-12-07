import { FormControl } from "@angular/forms";
import { LinkValidators } from "./link.validators";


describe('LinkValidators', () => {
    it('should return null for a valid URL', () => {
        const control = new FormControl('https://www.example.com' );
        const result = LinkValidators.shouldBeValidLink(control);
        expect(result).toBeNull();
    });

    it('should return null for a valid HTTP URL', () => {
        const control = new FormControl('http://www.example.com' );
        const result = LinkValidators.shouldBeValidLink(control);
        expect(result).toBeNull();
    });

    it('should return an error object for an invalid URL', () => {
        const control = new FormControl('www.example' );
        const result = LinkValidators.shouldBeValidLink(control);
        expect(result).toEqual(null);
      });
      
});
