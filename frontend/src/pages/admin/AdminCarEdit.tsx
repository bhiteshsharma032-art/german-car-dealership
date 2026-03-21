import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AdminCarEdit() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Helmet>
        <title>Fahrzeug bearbeiten - Admin</title>
      </Helmet>

      <div>
        <Link to="/admin/fahrzeuge" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zur Liste
        </Link>

        <h1 className="text-3xl font-bold mb-8">Fahrzeug bearbeiten (ID: {id})</h1>

        <div className="bg-[#1a1a1a] rounded-lg shadow p-6">
          <p className="text-gray-400">Formular wird implementiert...</p>
        </div>
      </div>
    </>
  );
}
