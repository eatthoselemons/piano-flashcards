import * as React from "react";
import { useRef, useState } from "react";
import "./App.css";
import { Note } from "./notes";
import { Clef, NoteNames } from "./constants";
import { AudioPlayer } from "./audio";

function App() {
  var [audioPlayerExists] = useState(false);
  var player = useRef<AudioPlayer>();

  return (
    <div className="App">
      <button
        onClick={() => {
          if (!player.current) {
            player.current = new AudioPlayer();
          }
          console.log(`audio player ${audioPlayerExists}`);
          audioPlayerExists = true;
        }}
        disabled={audioPlayerExists}
      >
        Start!
      </button>

      <button
        onClick={() =>
          player.current.playNote({
            noteValue: NoteNames.c,
            octave: 4,
            clef: Clef.Treble,
          })
        }
      >
        A
      </button>
      <button
        onClick={() =>
          player.current.playNote({
            noteValue: NoteNames.b,
            octave: 4,
            clef: Clef.Treble,
          })
        }
      >
        B
      </button>
      <button
        onClick={() =>
          player.current.playNote({
            noteValue: NoteNames.c,
            octave: 5,
            clef: Clef.Treble,
          })
        }
      >
        high C
      </button>
    </div>
  );
}

export default App;
