const fs = require("fs");

export default class Loader {
  static fromFolderAndFilename = (
    folderName: string,
    fileName: string
  ): Promise<ArrayBuffer> => {
    const filePath = `samples/${folderName}/${fileName}`;
    return Loader.getFileUrlAsync(filePath).then((url: string) =>
      Loader.fetchAsArrayBuffer(url)
    );
  };
  static fetchAsArrayBuffer = (url: string) => {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onload = () => {
        resolve(request.response);
      };
      request.onerror = () => {
        reject("error fetching asArrayBuffer");
      };
      request.send();
    });
  };
  static getFileUrlAsync = (filePath: string) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err: any, data: any) => {
        if (err) {
          debugger;
          reject(err);
        }
        const url: string = data.toString();
        resolve(url);
      });
    });
  };
}
