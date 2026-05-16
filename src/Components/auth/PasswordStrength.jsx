import React from "react";

export default function PasswordStrength({ password }) {
  const getStrength = () => {
    if (password.length < 6) {
      return {
        text: "Weak",
        width: "w-1/3",
      };
    }

    if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.length >= 8
    ) {
      return {
        text: "Strong",
        width: "w-full",
      };
    }

    return {
      text: "Medium",
      width: "w-2/3",
    };
  };

  const strength = getStrength();

  return (
    <div className="mt-2">
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 ${strength.width}`}
        />
      </div>

      <p className="text-sm text-gray-400 mt-1">
        Password Strength: {strength.text}
      </p>
    </div>
  );
}