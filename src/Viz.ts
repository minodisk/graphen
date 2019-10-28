export interface Error {
  row: number;
  column: number;
  text: string;
}

const rSyntaxError = /error in line (\d+)/;

export type Engine = "circo" | "dot" | "fdp" | "neato" | "osage" | "twopi";
export type Format =
  | "svg"
  | "dot"
  | "xdot"
  | "plain"
  | "plain-ext"
  | "ps"
  | "ps2"
  | "json"
  | "json0";

export interface Options {
  format: Format;
  scale: number;
  engine: Engine;
  files: Array<string>;
  images: Array<string>;
  yInvert: boolean;
  nop: number;
}

export class Viz {
  worker!: Worker;
  codes: Array<string> = [];
  promises: Array<{
    resolve: (result: string) => void;
    reject: (error: Error) => void;
  }> = [];

  constructor() {
    this.reset();
  }

  reset() {
    if (this.worker) {
      this.worker.removeEventListener("message", this.onMessage);
      this.worker.terminate();
    }
    this.worker = new Worker("/assets/scripts/full.render.js");
    this.worker.addEventListener("message", this.onMessage);
  }

  onMessage = ({
    data: { id, result, error },
  }: {
    data: { id: number; result: string; error: { message: string } };
  }) => {
    const { resolve, reject } = this.promises[id];
    if (error) {
      this.reset();

      const syntaxError = rSyntaxError.exec(error.message);
      if (syntaxError) {
        const row = Number(syntaxError[1]) - 1;
        reject({
          row,
          column: 0,
          text: error.message,
        });
        return;
      }
      return;
    }
    resolve(result);
  };

  render(code: string, options: Partial<Options> = {}): Promise<string> {
    this.codes.push(code);
    return new Promise((resolve, reject) => {
      const id = this.promises.length;
      this.promises.push({ resolve, reject });
      this.worker.postMessage({
        id,
        src: code,
        options: {
          format: "svg",
          scale: 2,
          engine: "dot",
          files: [],
          images: [],
          yInvert: false,
          nop: 0,
          ...options,
        },
      });
    });
  }
}
