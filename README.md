# **Bodybuilding Pose Detector**

🚀 A **real-time bodybuilding pose detection app** using **MoveNet** and **Tauri**. This app detects specific bodybuilding poses, for example **Front Double Biceps**, by analyzing key joint positions and angles.

## **📌 Features**

- **Real-time Pose Detection** – Uses **MoveNet** to track body keypoints.
- **Skeleton Visualization** – Draws detected keypoints and body connections on-screen.
- **Threshold-Based Accuracy** – Uses trigonometry for precise pose recognition.

## **🛠️ How It Works**

1. The app captures video from your **webcam**.
2. **MoveNet** detects **17 body keypoints** in real-time.
3. The app **analyzes joint angles** (e.g., shoulders, elbows, wrists).
4. If the key conditions for **the pose** are met, the app **confirms the pose**.
5. The general idea is for the logic to be strict enough but not too strict for the poses to have
a normal amount of leeway when detecting.


## **🎯 Pose Recognition Logic example**

- ✅ **Arms Raised** – Hands must be above shoulders.
- ✅ **Elbows Bent (~130°)** – Elbows must be slightly extended (not locked).
- ✅ **Hold to Confirm** – Pose must be held for **a few frames** for validation.
## **Clone the repository**

```sh
git clone https://github.com/Jambolul/poselyzer.git

cd poselyzer
```

### **Install Dependencies and run the app**

```sh
npm install

npm run tauri dev
```
