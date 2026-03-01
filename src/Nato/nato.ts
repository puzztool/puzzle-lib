import {NatoCharacter} from './NatoCharacter';

export const NATO_ALPHABET: readonly NatoCharacter[] = [
  new NatoCharacter('A', 'Alfa'),
  new NatoCharacter('B', 'Bravo'),
  new NatoCharacter('C', 'Charlie'),
  new NatoCharacter('D', 'Delta'),
  new NatoCharacter('E', 'Echo'),
  new NatoCharacter('F', 'Foxtrot'),
  new NatoCharacter('G', 'Golf'),
  new NatoCharacter('H', 'Hotel'),
  new NatoCharacter('I', 'India'),
  new NatoCharacter('J', 'Juliett'),
  new NatoCharacter('K', 'Kilo'),
  new NatoCharacter('L', 'Lima'),
  new NatoCharacter('M', 'Mike'),
  new NatoCharacter('N', 'November'),
  new NatoCharacter('O', 'Oscar'),
  new NatoCharacter('P', 'Papa'),
  new NatoCharacter('Q', 'Quebec'),
  new NatoCharacter('R', 'Romeo'),
  new NatoCharacter('S', 'Sierra'),
  new NatoCharacter('T', 'Tango'),
  new NatoCharacter('U', 'Uniform'),
  new NatoCharacter('V', 'Victor'),
  new NatoCharacter('W', 'Whiskey'),
  new NatoCharacter('X', 'X-ray'),
  new NatoCharacter('Y', 'Yankee'),
  new NatoCharacter('Z', 'Zulu'),
];

export function lookupNatoPhonetic(
  character: string,
): NatoCharacter | undefined {
  return NATO_ALPHABET.find(
    ch => ch.character.toUpperCase() === character.toUpperCase(),
  );
}
