export class InlineSvg {
  private readonly inlineSvg: string;
  private readonly viewBoxWidth: number;
  private readonly viewBoxHeight: number;

  constructor(inlineSvg: string, viewBoxWidth: number, viewBoxHeight: number) {
    this.inlineSvg = inlineSvg;
    this.viewBoxWidth = viewBoxWidth;
    this.viewBoxHeight = viewBoxHeight;
  }

  render(): string {
    // tslint:disable-next-line:max-line-length
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 ${
        this.viewBoxWidth} ${this.viewBoxHeight}">${this.inlineSvg}</svg>`;
  }
}
