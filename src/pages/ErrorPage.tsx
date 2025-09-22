import {useRouteError} from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div style={{padding: '2rem'}}>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <pre>{error.message}</pre>
    </div>
  );
}
