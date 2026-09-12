export default function BackgroundOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-aura-bg" />

      <div className="absolute left-[6%] top-[18%] h-40 w-40 animate-drift-a rounded-[2rem] bg-white/[0.03] blur-2xl" />
      <div className="absolute left-[16%] top-[70%] h-28 w-28 animate-drift-b rounded-[1.5rem] bg-white/[0.025] blur-2xl" />
      <div className="absolute right-[6%] top-[10%] h-72 w-72 animate-drift-c rounded-full bg-fuchsia-600/10 blur-[90px]" />
      <div className="absolute right-[10%] bottom-[8%] h-64 w-64 animate-drift-a rounded-full bg-purple-600/15 blur-[90px]" />
      <div className="absolute left-[-6%] bottom-[-8%] h-80 w-80 animate-drift-b rounded-full bg-pink-600/10 blur-[100px]" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 animate-drift-c rounded-full bg-purple-700/10 blur-[120px]" />
    </div>
  )
}
