export default function HomeBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base */}
      <div style={{ background: "var(--background)", position: "absolute", inset: 0 }} />

      {/* Deep forest orb — top left */}
      <div style={{
        position: "absolute", top: "-15%", left: "-10%",
        width: "55vw", height: "55vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(46,74,48,0.18) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      {/* Gold orb — top right, representing the oil drop */}
      <div style={{
        position: "absolute", top: "-5%", right: "-5%",
        width: "40vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,136,26,0.13) 0%, transparent 65%)",
        filter: "blur(50px)",
      }} />

      {/* Sage orb — bottom center */}
      <div style={{
        position: "absolute", bottom: "-10%", left: "30%",
        width: "50vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(111,143,85,0.10) 0%, transparent 70%)",
        filter: "blur(70px)",
      }} />

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                          linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: 0.4,
      }} />
    </div>
  );
}
