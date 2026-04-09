import { brand } from "@/lib/brand";

export function HomeBackground() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 12% 10%, ${brand.glow}, transparent 20%),
            radial-gradient(circle at 88% 14%, rgba(111,143,85,0.10), transparent 20%),
            radial-gradient(circle at 50% 100%, rgba(255,255,255,0.32), transparent 30%),
            linear-gradient(180deg, ${brand.backgroundSoft} 0%, ${brand.background} 52%, #EFE8DB 100%)
          `,
        }}
      />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(47,58,44,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(47,58,44,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div
        className="absolute left-[-8rem] top-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ backgroundColor: brand.glow }}
      />
      <div
        className="absolute right-[-8rem] top-[10rem] h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(111,143,85,0.10)" }}
      />
    </>
  );
}
