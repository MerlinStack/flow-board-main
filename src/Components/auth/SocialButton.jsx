import React from "react";

export default function SocialButton({ text }) {
  return (
    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition">
      {text}
    </button>
  );
}2