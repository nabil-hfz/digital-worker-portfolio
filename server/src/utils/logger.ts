

export type Level =
  | "error"
  | "warn"
  | "info"
  | "http"
  | "verbose"
  | "debug"
  | "silly";

export function log(message: any, level: Level = "debug") {

  if (level === "error") {
    console.error(`level is ${level}, message: `, message);
  } else {
    console.log(`level is ${level}, message: `, message);
  }
}

export function logWarn(message: any): void {
  const msg = `${JSON.stringify(message)} warn`;

  log(msg, "warn");

}

