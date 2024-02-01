import { Clef } from "./constants";

// Base Notes
export type NoSharps = 0 | 2 | 4 | 5 | 7 | 9 | 11;

// 12 pitches
export type NoteValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

// 7 octaves for full sized piano with 88 keys
export type Octave = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Note = {
  noteValue: NoSharps;
  octave: Omit<Octave, 1 | 7>;
  clef: Clef;
};
