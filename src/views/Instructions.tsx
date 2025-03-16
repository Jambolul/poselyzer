import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';

const Instructions = () => {
  return (
    <div className="p-6 text-center text-lg">
      <h1 className="text-3xl font-bold mb-4">📖 How to Use PoseLyzer</h1>
      
      <p className="mb-2">This app detects bodybuilding poses in real-time.</p>

      <h2 className="text-2xl font-semibold mt-6">✅ Supported Poses:</h2>
      <ul className="list-disc text-left max-w-md mx-auto mt-2">
        <li>💪 Front Double Biceps</li>
        <li>🦅 Lat Spread</li>
        <li>🏆 Zyzz Pose</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">📸 Pose Detection Tips:</h2>
      <ul className="list-disc text-left max-w-md mx-auto mt-2">
        <li>Ensure your full upper body is visible on camera.</li>
        <li>Hold each pose steady for a few seconds.</li>
        <li>Make sure lighting is good for better detection.</li>
        <li>When the app recognizes you pose correctly, a green text will appear!</li>
      </ul>

      <div className="mt-6">
        <NavLink to={'/'}>
          <Button variant="secondary">🏠 Back to Home</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Instructions;
