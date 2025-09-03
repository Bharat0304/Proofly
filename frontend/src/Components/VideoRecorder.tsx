import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export function VideoRecord() {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const startCapture = () => {
    setCapturing(true);
    const stream = webcamRef.current?.stream as MediaStream;
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
  };

  const stopCapture = () => {
    mediaRecorderRef.current?.stop();
    setCapturing(false);
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => prev.concat(event.data));
    }
  };

  const saveVideo = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      setRecordedChunks([]);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">🎥 Record Testimonial</h2>

      {!videoURL && (
        <Webcam
          ref={webcamRef}
          audio={true}
          className="w-full h-64 rounded-lg bg-black"
        />
      )}

      {videoURL && (
        <video
          src={videoURL}
          controls
          className="w-full h-64 rounded-lg bg-black"
        />
      )}

      <div className="flex gap-3 mt-4">
        {!capturing ? (
          <button
            onClick={startCapture}
            className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopCapture}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Stop Recording
          </button>
        )}

        {recordedChunks.length > 0 && (
          <button
            onClick={saveVideo}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoRecord;
