import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router';

const Home = () => {
  return (
    <>
      <h1 className="text-center p-4 text-lg font-bold">🏋️ PoseLyzer</h1>
      <section className="text-center">
        <p className="text-lg">Real-time bodybuilding pose analysis.</p>
      </section>

      <section className="p-8 flex justify-around">
  <NavLink to={'/DetectPose'}>
    <Button className="text-xl p-4">Start Pose Detection</Button>
  </NavLink>
  <NavLink to={'/instructions'}>
    <Button variant="secondary" className="text-xl p-4">📖 Instructions</Button>
  </NavLink>
</section>

      
    </>
  );
};

export default Home;
