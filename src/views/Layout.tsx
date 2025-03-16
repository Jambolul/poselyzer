import { Outlet, NavLink } from 'react-router';
import { Button } from '@/components/ui/button';

const Layout = () => {
  return (
    <>
      <header className="p-4 bg-zinc-900 text-zinc-50 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">💪 PoseLyzer</h1>
        </div>
        <nav>
          <NavLink to={'/'}>
            <Button variant={'secondary'}>Home</Button>
          </NavLink>
        </nav>
      </header>
      <section className="bg-zinc-800 text-zinc-50 min-h-screen p-6">
        <Outlet />
      </section>
    </>
  );
};

export default Layout;
