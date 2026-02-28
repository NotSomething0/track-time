<script lang="ts">
  let progress = $state(0);
  let signOutSuccess = $state(false);

  // Call the signout API when the component loads
  $effect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 2;
      } else {
        // Sign out user when progress reaches 100
        signOutUser();
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  });

  // Function to sign out the user and handle the redirection
  const signOutUser = async () => {
    try {
      // Make the API call to sign out
      const response = await fetch('/api/auth/signout');

      if (response.ok) {
        signOutSuccess = true;
        window.location.href = '/login';  // Redirect to login page after sign out
      } else {
        console.error("Sign out failed.");
      }
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };
</script>

<div class="relative z-10 flex flex-col items-center px-6 text-center">
  <div class="relative mb-8 h-48 w-48 flex items-center justify-center">
    <svg class="absolute inset-0 h-full w-full -rotate-90">
      <circle
        cx="96" cy="96" r="88"
        fill="none"
        stroke="currentColor"
        stroke-width="8"
        class="text-zinc-800"
      />
      <circle
        cx="96" cy="96" r="88"
        fill="none"
        stroke="url(#racing-gradient)"
        stroke-width="8"
        stroke-dasharray="552"
        stroke-dashoffset={552 - (552 * progress) / 100}
        stroke-linecap="round"
        class="transition-all duration-75 ease-linear"
      />
      <defs>
        <linearGradient id="racing-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ef4444" /> 
          <stop offset="50%" stop-color="#f97316" /> 
          <stop offset="100%" stop-color="#3b82f6" /> 
        </linearGradient>
      </defs>
    </svg>

    <div class="flex flex-col items-center">
      <span class="text-4xl font-black italic text-white leading-none">
        {Math.round(progress)}
      </span>
      <span class="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
        km/h
      </span>
    </div>
  </div>

  <div class="space-y-3">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
      <span class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
      <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Box Box Box</span>
    </div>
    
    <h1 class="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase">
      Pit <span class="text-red-500">Stop</span>
    </h1>
    
    <p class="text-zinc-400 font-medium max-w-xs mx-auto">
      Ending your session and clearing the track. See you at the next Grand Prix.
    </p>
  </div>

  <div class="mt-12 flex gap-1 items-center justify-center">
    <div class="h-1 w-8 bg-red-500 rounded-full"></div>
    <div class="h-1 w-12 bg-orange-500 rounded-full"></div>
    <div class="h-1 w-16 bg-blue-500 rounded-full"></div>
  </div>
</div>

<style>
  /* Custom italic font feel for racing */
  h1 {
    text-shadow: 0 10px 20px rgba(0,0,0,0.5);
    transform: skewX(-5deg);
  }
</style>