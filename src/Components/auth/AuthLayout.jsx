// // import React from "react";
// // import GlowBackground from "../ui/GlowBackground";
// // import { Zap } from "lucide-react";

// // export default function AuthLayout({ children }) {
// //   return (
// //     <div className="min-h-screen bg-[#050816] relative overflow-hidden flex items-center justify-center px-4">

// //       <GlowBackground />

// //       <div className="relative z-10 w-full max-w-md">

// //         <div className="text-center mb-10">
// //           <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
// //             <Zap className="text-white w-10 h-10" />
// //           </div>

// //           <h1 className="text-5xl font-extrabold mt-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
// //             FlowBoard
// //           </h1>

// //           <p className="text-gray-400 mt-3 text-lg">
// //             Your personal task command center
// //           </p>
// //         </div>

// //         {children}
// //       </div>
// //     </div>
// //   );
// // }

// export default function AuthLayout({ children }) {
//   return (
//     <div
//       style={{
//         background: "#050816",
//         minHeight: "100vh",
//         color: "white",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {children}
//     </div>
//   );
// }
export default function AuthLayout({ children }) {
  return (
    <div
      style={{
        background: "#050816",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}