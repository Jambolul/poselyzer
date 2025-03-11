import { Camera } from "@/components/Camera"; 


const DetectPose = () => {
  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl">Pose</h2>
      <Camera width={640} aspect={16 / 9} />
    </div>
  );
};

export default DetectPose;
