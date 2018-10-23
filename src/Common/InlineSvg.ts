class InlineSvg {
  private readonly inlineSvg: string;
  private readonly viewBoxWidth: number;
  private readonly viewBoxHeight: number;

  constructor(inlineSvg: string, viewBoxWidth: number, viewBoxHeight: number) {
    this.inlineSvg = inlineSvg;
    this.viewBoxWidth = viewBoxWidth;
    this.viewBoxHeight = viewBoxHeight;
  }

  public render(width: number): string {
    // tslint:disable-next-line:max-line-length
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" viewBox="0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}">${this.inlineSvg}</svg>`;
  }
}

export default InlineSvg;
