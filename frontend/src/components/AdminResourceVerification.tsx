import { useState, useEffect } from 'react';
import { Resource } from '../types';
import { api } from '../utils/api';

export default function AdminResourceVerification() {
  const [pendingResources, setPendingResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchPendingResources();
  }, []);

  const fetchPendingResources = async () => {
    try {
      // Get admin token from your auth system
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const resources = await api.getPendingResources(token);
      setPendingResources(resources);
    } catch (error) {
      setError('Failed to fetch pending resources');
      console.error(error);
    }
  };

  const handleVerification = async (resourceId: string, status: 'approved' | 'rejected') => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      await api.verifyResource(resourceId, status, token);
      fetchPendingResources();
    } catch (error) {
      setError('Failed to update resource status');
      console.error(error);
    }
  };

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pending Resources</h2>
      {pendingResources.length === 0 ? (
        <p className="text-gray-500">No pending resources to verify</p>
      ) : (
        <div className="space-y-4">
          {pendingResources.map((resource) => (
            <div key={resource.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{resource.name}</h3>
              <p className="text-sm text-gray-600">{resource.description}</p>
              <p className="text-sm">
                <span className="font-medium">Category:</span> {resource.category}
              </p>
              <p className="text-sm">
                <span className="font-medium">URL:</span>{' '}
                <a href={resource.url} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  {resource.url}
                </a>
              </p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Submitted by: {resource.submittedBy.name}</p>
                <p>Email: {resource.submittedBy.email}</p>
                <p>Date: {new Date(resource.submittedAt).toLocaleDateString()}</p>
              </div>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleVerification(resource.id, 'approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleVerification(resource.id, 'rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
