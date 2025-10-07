export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-green-700 font-semibold text-lg">Loading...</p>
    </div>
  );
}
