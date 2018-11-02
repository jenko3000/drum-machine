import * as React from "react";
import Sound from "./../sound/Sound";
import Loader from "./../utils/Loader";

const fs = require("fs");

type playHandle = () => void;
interface TProps {
  onSoundLoaded: (playHandle: playHandle) => void;
  index: number;
}
interface TState {
  selectedFolder: string;
  fileOptions: Array<string>;
  selectedFile: string;
}
export default class SoundPicker extends React.Component<TProps, TState> {
  audioContext: AudioContext;
  windowRef: any;
  sound: Sound;
  folders: Array<string>;
  constructor(props: TProps) {
    super(props);
    this.windowRef = window as any;
    this.init();
    const selectedFolder = this.folders[props.index];
    const fileOptions = this.getFilesInFolder(selectedFolder);
    this.state = {
      selectedFolder: selectedFolder,
      selectedFile: fileOptions[0],
      fileOptions: fileOptions
    };
  }
  init = () => {
    const fileApisSupported =
      this.windowRef.File &&
      this.windowRef.FileReader &&
      this.windowRef.FileList &&
      this.windowRef.Blob;
    if (!fileApisSupported) {
      alert("The File APIs are not fully supported in this browser.");
    }
    if (typeof this.windowRef.AudioContext == "function") {
      this.audioContext = new AudioContext();
    } else if (typeof this.windowRef.webkitAudioContext == "function") {
      this.audioContext = new this.windowRef.webkitAudioContext();
    }
    this.folders = fs.readdirSync("/samples").sort();
  };
  play = () => {
    this.sound.play();
  };
  getFilesInFolder = (folderName: string): Array<string> => {
    const dirStr = `/samples/${folderName}/`;
    const files = fs.readdirSync(dirStr);
    return files;
  };
  componentDidMount() {
    this.loadSound();
  }
  handleFolderChange = (ev: React.FormEvent<HTMLSelectElement>) => {
    const folder = ev.currentTarget.value;
    const fileOptions = this.getFilesInFolder(folder);
    this.setState(
      {
        selectedFolder: folder,
        fileOptions: fileOptions,
        selectedFile: fileOptions[0]
      },
      this.loadSound
    );
  };

  loadSound = () => {
    const { onSoundLoaded } = this.props;
    const { selectedFolder, selectedFile } = this.state;
    if (this.sound) {
      this.sound.unload();
    }
    Loader.fromFolderAndFilename(selectedFolder, selectedFile).then(
      (data: ArrayBuffer) => {
        this.sound = new Sound(this.audioContext, data);
        onSoundLoaded(this.play);
      }
    );
  };
  handleFileChange = (ev: React.FormEvent<HTMLSelectElement>) => {
    const fileName = ev.currentTarget.value;
    this.setState({ selectedFile: fileName }, this.loadSound);
  };
  render() {
    //<input type="file" id="files" name="files" onChange={this.fileChanged} />
    const { selectedFolder, fileOptions, selectedFile } = this.state;

    return (
      <div className="sound-selector">
        <select onChange={this.handleFolderChange} value={selectedFolder}>
          {this.folders.map(c => <option key={c}>{c}</option>)}
        </select>
        <select onChange={this.handleFileChange} value={selectedFile}>
          {fileOptions.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
    );
  }
}
