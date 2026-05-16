import React from "react";

export default function AuthInput({
  icon,
  type,
  placeholder,
  value,
  onChange,
  name,
})
{
  return (
    <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 focus-within:border-purple-500 transition-all">
      
      <div className="text-gray-400">{icon}</div>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent py-4 px-3 outline-none text-white placeholder:text-gray-500"
      />
    </div>
  );
}