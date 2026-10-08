import { Link, useLocation } from "react-router";

// Same vocabulary as the home page: display heading, readout panel, primary button.
export function NotFound() {
  const location = useLocation();

  return (
    <section className="wrap flex flex-col justify-center py-16 sm:min-h-[min(calc(100svh-5rem),56rem)]">
      <div>
        <h1 className="t-display max-w-2xl">
          This route was never deployed.
        </h1>
        <p className="t-body m-0 mt-6 max-w-xl">
          The page you're looking for doesn't exist, or got refactored out of existence.
          Let's get you back to something that compiles.
        </p>

        <div className="mt-8 max-w-md rounded-lg border border-ink/10 bg-surface p-4 font-mono text-xs leading-6">
          <p className="m-0 break-all text-ink/70">GET {location.pathname}</p>
          <p className="m-0 font-semibold text-ink">404 Not Found</p>
        </div>

        <Link to="/" className="btn btn-primary mt-8">Back home</Link>
      </div>
    </section>
  );
}
