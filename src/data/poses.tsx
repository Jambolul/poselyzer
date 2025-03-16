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
  
        const leftElbowAngle = getAngle(left_shoulder, left_elbow, left_wrist);
        const rightElbowAngle = getAngle(right_shoulder, right_elbow, right_wrist);
  
  
        const elbowsBentCorrectly = (leftElbowAngle > 120 && leftElbowAngle < 160) &&
                                    (rightElbowAngle > 120 && rightElbowAngle < 160);
        const wristsAboveShoulders = left_wrist.y < left_shoulder.y && right_wrist.y < right_shoulder.y;
  
  
        return elbowsBentCorrectly && wristsAboveShoulders;
      }
    },
  
    lat_spread: {
      name: "Lat Spread",
      keypoints: ["left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist"],
      conditions: (keypoints: { [key: string]: { x: number, y: number } }) => {
        const { left_shoulder, right_shoulder, left_elbow, right_elbow, left_wrist, right_wrist } = keypoints;
  
        if (!left_shoulder || !right_shoulder || !left_elbow || !right_elbow || !left_wrist || !right_wrist) {
          console.log("❌ Missing keypoints for Lat Spread!");
          return false;
        }
  
        const leftElbowAngle = getAngle(left_shoulder, left_elbow, left_wrist);
        const rightElbowAngle = getAngle(right_shoulder, right_elbow, right_wrist);
  
  
        const elbowsFlared = (leftElbowAngle > 85 && leftElbowAngle < 130) &&
                             (rightElbowAngle > 85 && rightElbowAngle < 130);
  
        const wristsBelowShoulders = left_wrist.y >= left_shoulder.y && right_wrist.y >= right_shoulder.y;
  
  
        return elbowsFlared && wristsBelowShoulders;
      }
    },
    zyzz_pose: {
    name: "Zyzz Pose",
    keypoints: ["left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist"],
    conditions: (keypoints: { [key: string]: { x: number, y: number } }) => {
      const { left_shoulder, right_shoulder, left_elbow, right_elbow, left_wrist, right_wrist } = keypoints;

      if (!left_shoulder || !right_shoulder || !left_elbow || !right_elbow || !left_wrist || !right_wrist) {
        console.log("❌ Missing keypoints for Zyzz Pose!");
        return false;
      }

      // Measure elbow angles
      const leftElbowAngle = getAngle(left_shoulder, left_elbow, left_wrist);
      const rightElbowAngle = getAngle(right_shoulder, right_elbow, right_wrist);

      // One arm should be **fully extended** (~160-180°)
      const oneArmExtended = (leftElbowAngle > 40 && leftElbowAngle < 90) || 
                              (rightElbowAngle > 40 && rightElbowAngle < 90);

      // One arm should be **flexed** (~60-100°)
      const oneArmFlexed = (leftElbowAngle > 120 && leftElbowAngle < 160) || 
                            (rightElbowAngle > 120 && rightElbowAngle < 160);

      // At least one wrist should be above the shoulder level
      const wristsAboveShoulders = left_wrist.y < left_shoulder.y || right_wrist.y < right_shoulder.y;


      return oneArmExtended && oneArmFlexed && wristsAboveShoulders;
    }
  }
  };
  