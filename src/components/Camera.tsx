import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { poses } from "@/data/poses";

type CameraProps = {
  width: number;
  aspect: number;
};

const Camera = forwardRef<HTMLVideoElement, CameraProps>((props, ref) => {
  const { width, aspect } = props;
  const height = width / aspect;
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let detector: poseDetection.PoseDetector | null = null;

  useImperativeHandle(ref, () => videoRef.current!);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        console.log("Requesting camera access...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width, height },
          audio: false,
        });

        console.log("Camera access granted!");
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
          };
        }
      } catch (error) {
        console.error("Error accessing camera:", (error as Error).message);
      }
    };

    const loadModel = async () => {
      console.log("Initializing TensorFlow...");
      await tf.setBackend("webgl"); // ✅ Force WebGL backend for better performance
      await tf.ready(); // ✅ Ensure TensorFlow is fully loaded

      console.log("Loading MoveNet model...");
      detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
      );

      console.log("MoveNet model loaded!");
    };

   /* const keypointConnections = [
      ["left_shoulder", "right_shoulder"],
      ["left_shoulder", "left_elbow"],
      ["left_elbow", "left_wrist"],
      ["right_shoulder", "right_elbow"],
      ["right_elbow", "right_wrist"],
      ["left_hip", "right_hip"],
      ["left_hip", "left_knee"],
      ["left_knee", "left_ankle"],
      ["right_hip", "right_knee"],
      ["right_knee", "right_ankle"],
      ["left_shoulder", "left_hip"],
      ["right_shoulder", "right_hip"]
    ];*/
    

    let poseFrames = 0; // Count how long the pose is held

    const detectPose = async () => {
      if (!videoRef.current || !detector || !canvasRef.current) return;
    
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
    
      const detect = async () => {
        if (!videoRef.current || !detector) return;
    
        const posesDetected = await detector.estimatePoses(videoRef.current!);


    
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(videoRef.current!, 0, 0, width, height);
    
        let detectedPoseName = null;
    
        posesDetected.forEach((pose) => {
          pose.keypoints.forEach((keypoint) => {
            if (keypoint.score !== undefined && keypoint.score > 0.3) {
              ctx.fillStyle = "red";
              ctx.beginPath();
              ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
              ctx.fill();
            }
          });
    
          Object.values(poses).forEach(({ name, conditions }) => {
            if (conditions(Object.fromEntries(pose.keypoints.map(kp => [kp.name, kp])))) {
              detectedPoseName = name;
            }
          });
        });
    
        if (detectedPoseName) {
          poseFrames++; // Increase counter if pose is detected
          if (poseFrames > 10) { // Require 10 consecutive frames (~0.3 sec)
            console.log(`🔥 ${detectedPoseName} Pose Confirmed!`);
            ctx.fillStyle = "green";
            ctx.font = "20px Arial";
            ctx.fillText(detectedPoseName, 50, 50);
          }
        } else {
          poseFrames = 0; // Reset if pose disappears
        }
    
        requestAnimationFrame(detect);
      };
    
      detect();
    };
    

    const initialize = async () => {
      await setupCamera();
      await loadModel();
      detectPose();
    };

    initialize();

    return () => {
      detector = null;
    };
  }, []);

  return (
    <div style={{ position: "relative", width, height }}>
      <video ref={videoRef} width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }} />
      <canvas ref={canvasRef} width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }} />
    </div>
  );
});

export { Camera}
