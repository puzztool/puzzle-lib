import { CharacterImage } from '../Common/CharacterImage';
import { InlineSvg } from '../Common/InlineSvg';

export class NavalFlags {
  static readonly instance: NavalFlags = new NavalFlags();

  private readonly _entries: CharacterImage[] = [
    // tslint:disable:max-line-length (SVG images are messy)
    new CharacterImage(
      'A',
      new InlineSvg(
        `<path d="M 18,18 H 162 L 126,90 L 162,162 H 18 z" fill="#000094"/>
      <rect x="18" y="18" width="72" height="144" fill="#fff"/>
      <path d="M 18,18 H 162 L 126,90 L 162,162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'B',
      new InlineSvg(
        '<path d="M 18,18 H 162 L 126,90 L 162,162 H 18 z" fill="#f00" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>',
        180,
        180
      )
    ),
    new CharacterImage(
      'C',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#000094"/>
      <rect x="18" y="46.8" width="144" height="86.4" fill="#fff"/>
      <rect x="18" y="75.6" width="144" height="28.8" fill="#f00"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'D',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#fc0"/>
      <rect x="18" y="54" width="144" height="72" fill="#000094"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'E',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#000094"/>
      <rect x="18" y="90" width="144" height="72" fill="#f00"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'F',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#fff"/>
      <path d="M 90,18 l 72,72 l -72,72 l -72,-72 z" fill="#f00"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'G',
      new InlineSvg(
        `<path fill="#000094" d="m18,18h144v144H18"/>
      <path stroke="#FC0" stroke-width="24" d="m30,18v144m48,0V18m48,0v144"/>
      <path d="M18,18H162V162H18z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'H',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#f00"/>
      <rect x="18" y="18" width="72" height="144" fill="#fff"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'I',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#fc0"/>
      <circle cx="90" cy="90" r="36" fill="#000"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'J',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#000094"/>
      <rect x="18" y="66" width="144" height="48" fill="#fff"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'K',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#000094"/>
      <rect x="18" y="18" width="72" height="144" fill="#fc0"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'L',
      new InlineSvg(
        `<rect x="16" y="16" width="148" height="148" rx="2"/>
      <path fill="#FC0" d="m20,20h70v140h70V90H20"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'M',
      new InlineSvg(
        `<clipPath id="c">
      <path d="M 18,18 H 162 V 162 H 18 z"/>
      </clipPath>
      <rect x="18" y="18" width="144" height="144" fill="#000094"/>
      <path d="M 18,18 L 162,162 M 162,18 L 18,162" clip-path="url(#c)" stroke="#fff" stroke-width="28.8"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'N',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#fff"/>
      <path d="M 18,18 H 54 V 162 H 90 V 18 H 126 V 162 H 162 V 126 H 18 V 90 H 162 V 54 H 18 z" fill="#000094"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'O',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#fc0"/>
      <path d="M 18,18 H 162 V 162 z" fill="#f00"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'P',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#000094"/>
      <rect x="54" y="54" width="72" height="72" fill="#fff"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'Q',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#fc0"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'R',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#f00"/>
      <path d="M 90,18 V 162 M 18,90 H 162" stroke="#fc0" stroke-width="36"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'S',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#fff"/>
      <rect x="54" y="54" width="72" height="72" fill="#000094"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'T',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#000094"/>
      <rect x="18" y="18" width="96" height="144" fill="#fff"/>
      <rect x="18" y="18" width="48" height="144" fill="#f00"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'U',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#ffffff"/>
      <path d="M 18,18 H 90 V 90 H 18 z" fill="#ff0000"/>
      <path d="M 162,91 H 91 V 162 H 162 z" fill="#ff0000"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'V',
      new InlineSvg(
        `<clipPath id="c">
      <path d="M 18,18 H 162 V 162 H 18 z"/>
      </clipPath>
      <rect x="18" y="18" width="144" height="144" fill="#fff"/>
      <path d="M 18,18 L 162,162 M 162,18 L 18,162" clip-path="url(#c)" stroke="#f00" stroke-width="28.8"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'W',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#000094"/>
      <rect x="42" y="42" width="96" height="96" fill="#fff"/>
      <rect x="66" y="66" width="48" height="48" fill="#f00"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'X',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#fff"/>
      <path d="M 90,18 V 162 M 18,90 H 162" stroke="#000094" stroke-width="36"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'Y',
      new InlineSvg(
        `<clipPath id="c"><path d="m18,18h144v144H18"/></clipPath>
      <path fill="#FC0" d="m18,18h144v144H18"/>
      <path stroke="#F00" stroke-dasharray="18.8" stroke-width="250" clip-path="url(#c)" d="m4,4 160,160"/>
      <path fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round" d="M18,18H162V162H18z"/>`,
        180,
        180
      )
    ),
    new CharacterImage(
      'Z',
      new InlineSvg(
        `<rect x="18" y="18" width="144" height="144" fill="#fc0"/>
      <path d="M 18,18 V 162 H 162 z" fill="#000"/>
      <path d="M 162,18 V 162 H 18 z" fill="#000094"/>
      <path d="M 90,90 L 162,162 H 18 z" fill="#f00"/>
      <path d="M 18,18 H 162 V 162 H 18 z" fill="none" stroke="#000" stroke-width="3.75" stroke-linejoin="round"/>`,
        180,
        180
      )
    ),
    // tslint:enable:max-line-length
  ];

  get entries(): CharacterImage[] {
    return this._entries;
  }

  lookup(letter: string): CharacterImage | null {
    for (const ch of this._entries) {
      if (ch.character.toUpperCase() === letter.toUpperCase()) {
        return ch;
      }
    }
    return null;
  }
}
