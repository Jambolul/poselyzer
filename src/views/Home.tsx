import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

const Home = () => {
  const [result, setResult] = useState({ positives: 0, negatives: 0 });

  useEffect(() => {
    try {

    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleClearDatabase = () => {
    try {
      setResult({ positives: 0, negatives: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-center p-4 text-lg">Home</h1>
      <section className="text-center">

      </section>
      <section className="p-4">
        <p>Results:</p>

        <div>
          <p>Positives: {result.positives}</p>
          <p>Negatives: {result.negatives}</p>
        </div>
      </section>
      <section className="p-8 flex justify-around">
        <NavLink to={'/face'}>
          <Button>Start Voting</Button>
        </NavLink>
        <Button onClick={handleClearDatabase}>Clear Database</Button>
      </section>
    </>
  );
};

export default Home;
