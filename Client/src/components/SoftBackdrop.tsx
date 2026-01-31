const SoftBackdrop = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Top strong pink glow */}
      <div
        className="
          absolute left-1/2 top-16
          -translate-x-1/2
          w-[420px] h-[220px]
          bg-gradient-to-tr
          from-pink-600/60 via-rose-500/45 to-transparent
          rounded-full blur-[180px]
        "
      />

      {/* Bottom strong red glow */}
      <div
        className="
          absolute right-0 bottom-0
          w-[380px] h-[200px]
          bg-gradient-to-bl
          from-red-600/55 via-pink-500/40 to-transparent
          rounded-full blur-[160px]
        "
      />

      {/* Extra subtle center glow (adds depth) */}
      <div
        className="
          absolute left-1/3 top-1/2
          w-[300px] h-[180px]
          bg-pink-500/30
          rounded-full blur-[200px]
        "
      />
    </div>
  );
};

export default SoftBackdrop;
