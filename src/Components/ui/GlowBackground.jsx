import React from "react";

export default function GlowBackground() {
  return (
    <>
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />
    </>
  );
}