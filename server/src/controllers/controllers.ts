import { Controller } from "./index";
import { EntryController } from "./entry-controller/entry-controller";

export const CONTROLLERS: Array<Controller> = [

  new EntryController(),
];
