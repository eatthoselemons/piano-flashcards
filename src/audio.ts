import type { Note } from "./notes";

export class AudioPlayer {
  audioContext?: AudioContext;
  samples?: {
    C2: AudioBuffer;
    C3: AudioBuffer;
    C4: AudioBuffer;
    C5: AudioBuffer;
    C6: AudioBuffer;
    C7: AudioBuffer;
  };

  constructor() {
    this.audioContext = this.getCrossBrowserAudioContext();
    const audioExtension = this.getSupportedAudioExtension();

    // check for support for the web audio api
    if (!this.audioContext || !audioExtension) {
      return;
    }

    this.applyDecodeAudioDataPolyfill();

    const fileNames = ["C2v10", "C3v10", "C4v10", "C5v10", "C6v10", "C7v10"];

    Promise.all(
      fileNames.map((fileName) =>
        this.loadSample(`../audio/${fileName}.${audioExtension}`),
      ),
    ).then((audioBuffers) => {
      const [C2, C3, C4, C5, C6, C7] = audioBuffers;
      this.samples = { C2, C3, C4, C5, C6, C7 };
    });
  }

  private getCrossBrowserAudioContext(): AudioContext | undefined {
    const AudioContextCrossBrowser =
      window.AudioContext ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).webkitAudioContext as AudioContext);

    if (!AudioContextCrossBrowser) {
      return;
    }

    return new AudioContextCrossBrowser();
  }

  private getSupportedAudioExtension(): "mp3" | "ogg" | undefined {
    const audioElement = document.createElement("audio");

    if (audioElement.canPlayType("audio/mpeg")) {
      return "mp3";
    }

    if (audioElement.canPlayType("audio/ogg")) {
      return "ogg";
    }
  }

  private loadSample(url: string): Promise<AudioBuffer> {
    return (
      fetch(url)
        .then((response) => response.arrayBuffer())
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .then((buffer) => this.audioContext!.decodeAudioData(buffer))
    );
  }

  private getBestSampleForNote(
    noteValue: number,
    octave: number,
  ): [adjustedNoteValue: number, sample: AudioBuffer] {
    let adjustedNoteValue = noteValue;
    let adjustedOctave = octave;

    // use the closest sample to minimize pitch shifting
    if (noteValue > 6 && octave <= 7) {
      adjustedOctave = octave + 1;
      adjustedNoteValue = noteValue - 12;
    }

    type SampleName = keyof typeof this.samples;

    return [
      adjustedNoteValue,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.samples![`C${adjustedOctave}` as SampleName],
    ];
  }

  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }

  playNote(note: Note) {
    if (!this.audioContext || !this.samples) {
      return;
    }

    this.playTone(
      ...this.getBestSampleForNote(note.noteValue, note.octave as number),
    );
  }
}
