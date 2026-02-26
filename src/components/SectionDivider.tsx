const SectionDivider = () => {
  return (
    <div className="py-8 bg-background flex items-center justify-center gap-4">
      <div className="w-24 h-px bg-gradient-to-r from-transparent to-antique-gold/40" />
      <span className="text-accent text-2xl">✦</span>
      <div className="w-24 h-px bg-gradient-to-l from-transparent to-antique-gold/40" />
    </div>
  );
};

export default SectionDivider;
