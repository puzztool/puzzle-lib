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
    return `<svg width="${width}" viewBox="0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}">${this.inlineSvg}</svg>`;
  }
}

export default InlineSvg;
