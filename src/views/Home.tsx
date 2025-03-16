import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router';

const Home = () => {
  return (
    <>
      <h1 className="text-center p-4 text-lg font-bold">🏋️ PoseLyzer</h1>
      <section className="text-center">
        <p className="text-lg">Real-time bodybuilding pose analysis.</p>
      </section>

      <section className="p-8 flex justify-center">
        <NavLink to={'/detect'}>
          <Button className="text-xl p-4">Start Pose Detection</Button>
        </NavLink>
      </section>
    </>
  );
};

export default Home;
