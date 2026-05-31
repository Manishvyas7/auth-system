export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Auth System 🚀</h1>
        <p className="mt-2">Your app is deployed successfully</p>

        <div className="mt-6 space-x-4">
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
          <a href="/signup" className="text-blue-500 underline">
            Signup
          </a>
        </div>
      </div>
    </div>
  );
}