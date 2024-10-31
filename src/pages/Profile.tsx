import { useAuth0 } from '@auth0/auth0-react';

export function Profile() {
  const { user } = useAuth0();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        </div>

        <div className="flex items-center space-x-8 mb-8">
          <img
            src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name}`}
            alt={user?.name}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Account Information</h4>
            <dl className="mt-2 divide-y divide-gray-200">
              <div className="py-3 flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900">{user?.name}</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">{user?.email}</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Email Verified</dt>
                <dd className="text-sm text-gray-900">
                  {user?.email_verified ? 'Yes' : 'No'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}