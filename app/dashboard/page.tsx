export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-black text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold">
          Auth System Dashboard
        </h1>
      </div>

      <div className="max-w-5xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-4xl font-bold mb-3">
            Welcome 🎉
          </h2>

          <p className="text-gray-600">
            Authentication completed successfully.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-semibold">
                Authentication
              </h3>
              <p className="text-gray-500 mt-2">
                JWT Login Enabled
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-semibold">
                OAuth Providers
              </h3>
              <p className="text-gray-500 mt-2">
                Google + Microsoft
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-semibold">
                Password Recovery
              </h3>
              <p className="text-gray-500 mt-2">
                OTP Verification Enabled
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}