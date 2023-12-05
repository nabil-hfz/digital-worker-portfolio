import { CreateEntryReqBody } from "./create-entry-req-body";
import { HttpResponseError } from "../../../../utils/http-response-error";

export function checkIfIsValidCreateEntryReqBody(body: CreateEntryReqBody) {

  if (!body?.title?.length) {
    throw new HttpResponseError(400, "BAD_REQUEST", 'No "title" defined');
  }


  if (!body?.customerLink) {
    throw new HttpResponseError(400, "BAD_REQUEST", 'No "customer Link" defined');
  }



}
