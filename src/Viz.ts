export interface Error {
  row: number;
  column: number;
  text: string;
}

const rSyntaxError = /error in line (\d+)/;

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
    this.worker = new Worker("/full.render.js");
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

  render(code: string): Promise<string> {
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
        },
      });
    });
  }
}