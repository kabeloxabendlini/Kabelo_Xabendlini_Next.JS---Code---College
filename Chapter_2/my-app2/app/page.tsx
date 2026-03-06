"use client"; // allows hooks inside ThemeToggle

import ThemeToggle from "./components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200">

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm">

        {/* Left */}
        <div className="navbar-start">

          {/* Mobile menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              ☰
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><a>Home</a></li>
              <li><a>Features</a></li>
              <li><a>Pricing</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>

          <a className="btn btn-ghost text-xl">My Next App</a>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li><a>Features</a></li>
            <li><a>Pricing</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-2">
          <ThemeToggle />

          <button className="btn btn-primary">
            Login
          </button>
        </div>

      </div>

      {/* Hero Section */}
      <section className="hero py-20 text-center">
        <div className="hero-content">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello Next.js</h1>

            <p className="py-6">
              This is a Next.js app using Tailwind CSS and DaisyUI.
              Build beautiful interfaces quickly.
            </p>

            <button className="btn btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="p-10 grid md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Next.js</h2>
            <p>Powerful React framework for production apps.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Learn</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Tailwind CSS</h2>
            <p>Utility-first CSS framework for fast UI design.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary">Learn</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">DaisyUI</h2>
            <p>Component library built on Tailwind CSS.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-accent">Learn</button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// "use client"; // allows hooks inside ThemeToggle

// import ThemeToggle from "./components/theme-toggle";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-base-200">

//       {/* Navbar */}
//       <div className="navbar bg-base-100 shadow-sm">
//         {/* Left */}
//         <div className="navbar-start">
//           <div className="dropdown">
//             <label tabIndex={0} className="btn btn-ghost lg:hidden">☰</label>
//             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//               <li><a>Home</a></li>
//               <li><a>Features</a></li>
//               <li><a>Pricing</a></li>
//               <li><a>Contact</a></li>
//             </ul>
//           </div>
//           <a className="btn btn-ghost text-xl">My Next App</a>
//         </div>

//         {/* Desktop menu */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             <li><a>Home</a></li>
//             <li><a>Features</a></li>
//             <li><a>Pricing</a></li>
//             <li><a>Contact</a></li>
//           </ul>
//         </div>

//         {/* Right */}
//         <div className="navbar-end gap-2">
//           <ThemeToggle />
//           <button className="btn btn-primary">Login</button>
//         </div>
//       </div>

//         {/* Hero Section */}
//       <section className="hero py-20 text-center">
//         <div className="hero-content">
//           <div className="max-w-md">
//             <h1 className="text-5xl font-bold">Hello Next.js</h1>

//             <p className="py-6">
//               This is a Next.js app using Tailwind CSS and DaisyUI.
//               Build beautiful interfaces quickly.
//             </p>

//             <button className="btn btn-primary">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Cards */}
//       <section className="p-10 grid md:grid-cols-3 gap-6">
//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">Next.js</h2>
//             <p>Powerful React framework for production apps.</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-primary">Learn</button>
//             </div>
//           </div>
//         </div>

//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">Tailwind CSS</h2>
//             <p>Utility-first CSS framework for fast UI design.</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-secondary">Learn</button>
//             </div>
//           </div>
//         </div>

//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">DaisyUI</h2>
//             <p>Component library built on Tailwind CSS.</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-accent">Learn</button>
//             </div>
//           </div>
//         </div>
//       </section>

//     </main>
//   );
// }
      