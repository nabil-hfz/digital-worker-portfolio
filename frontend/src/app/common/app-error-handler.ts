import { ErrorHandler } from "@angular/core";
import { AppNotFoundError } from "./not-found-error";
import { AppBadInputError } from "./bad-input";



export class AppErrorHandler implements ErrorHandler {
    handleError(error: any): void {

        if (error instanceof AppNotFoundError) {
            alert('This post has already been deleted.');
        }

        else if (error instanceof AppBadInputError) {
            alert('Bad request.');
        }
        else {
            alert('An unexpected error occurred.');
            console.log(error);

        }

    }
}