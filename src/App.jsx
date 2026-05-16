// export default function App() {
//   return (
//     <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-6 py-4 border-b border-white/10">
//         <h1 className="text-xl font-bold">FlowBoard</h1>

//         <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
//           Login
//         </button>
//       </header>

//       {/* Main Section */}
//       <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
//         <h2 className="text-4xl md:text-6xl font-bold">
//           Organize your workflow
//         </h2>

//         <p className="text-gray-400 mt-4 max-w-xl">
//           FlowBoard helps you manage tasks, projects, and ideas in one simple place.
//         </p>

//         <div className="mt-6 flex gap-4">
//           <button className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700">
//             Get Started
//           </button>

//           <button className="border border-white/20 px-5 py-2 rounded-lg hover:bg-white/10">
//             Learn More
//           </button>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="text-center text-gray-500 text-sm py-4 border-t border-white/10">
//         © 2026 FlowBoard
//       </footer>
//     </div>
//   );
// }
import Signup from "./pages/Signup";

export default function App() {
  return <Signup />;
}