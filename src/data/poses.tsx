const getAngle = (A: { x: number, y: number }, B: { x: number, y: number }, C: { x: number, y: number }) => {
    const AB = { x: B.x - A.x, y: B.y - A.y };
    const BC = { x: C.x - B.x, y: C.y - B.y };
  
    const dotProduct = AB.x * BC.x + AB.y * BC.y;
    const magnitudeAB = Math.sqrt(AB.x ** 2 + AB.y ** 2);
    const magnitudeBC = Math.sqrt(BC.x ** 2 + BC.y ** 2);
  
    const angle = Math.acos(dotProduct / (magnitudeAB * magnitudeBC)) * (180 / Math.PI);
    return angle;
  };
  

export const poses = {
    front_double_biceps: {
      name: "Front Double Biceps",
      keypoints: ["left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist"],
      conditions: (keypoints: { [key: string]: { x: number, y: number } }) => {
        const { left_shoulder, right_shoulder, left_elbow, right_elbow, left_wrist, right_wrist } = keypoints;
  
        if (!left_shoulder || !right_shoulder || !left_elbow || !right_elbow || !left_wrist || !right_wrist) {
          console.log("Missing keypoints for FDB pose!");
          return false;
        }
  
        // ✅ Use correct elbow angle calculation
        const leftElbowAngle = getAngle(left_shoulder, left_elbow, left_wrist);
        const rightElbowAngle = getAngle(right_shoulder, right_elbow, right_wrist);
  
        console.log("📏 Left Elbow Angle:", leftElbowAngle);
        console.log("📏 Right Elbow Angle:", rightElbowAngle);
  
        // Conditions for FDB Pose
        const elbowsBentCorrectly = (leftElbowAngle > 110 && leftElbowAngle < 150)&&
                                    (rightElbowAngle > 110 && rightElbowAngle < 150);
        const wristsAboveShoulders = left_wrist.y < left_shoulder.y && right_wrist.y < right_shoulder.y;
  
        console.log("✅ Elbows Bent:", elbowsBentCorrectly);
        console.log("✅ Wrists Above Shoulders:", wristsAboveShoulders);
  
        return elbowsBentCorrectly && wristsAboveShoulders;
      }
    }
  };
  