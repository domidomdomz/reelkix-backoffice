export default function Topbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="bg-reelkix-black text-white p-4 flex items-center justify-between md:hidden">
      <img src="/assets/reelkix-label-logo.png" alt="Reelkix Logo" className="h-24 w-auto" />
      <button
        onClick={toggleSidebar}
        className="text-reelkix-red text-2xl font-bold"
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>
    </header>
  );
}