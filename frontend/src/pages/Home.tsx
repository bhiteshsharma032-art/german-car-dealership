import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Willkommen bei unserem Autohaus</h1>
      <p>Finden Sie Ihr Traumauto</p>
      <Link to="/fahrzeuge">
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Fahrzeuge ansehen
        </button>
      </Link>
    </div>
  );
}

export default Home;
