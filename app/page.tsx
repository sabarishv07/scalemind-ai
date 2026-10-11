import { auth, signIn, signOut } from "@/auth";
import ChatUI from "@/components/ChatUI";

async function signOutAction() {
  "use server";

  await signOut();
}

export default async function Home() {
  const session = await auth();

  // =====================================================
  // LOGIN SCREEN
  // =====================================================

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-6 text-white">

        <div className="w-full max-w-md text-center">

          {/* SCALEMIND LOGO */}

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-4 shadow-2xl">

            <img
              src="/scalemind-logo.png"
              alt="ScaleMind AI"
              className="h-full w-full object-contain"
            />

          </div>

          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
            Welcome to
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            ScaleMind AI
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-zinc-500">
            Your intelligent AI business assistant for ideas,
            strategy, development, research and problem solving.
          </p>

          {/* GOOGLE LOGIN */}

          <form
            action={async () => {
              "use server";

              await signIn("google");
            }}
          >

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >

              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >

                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42Z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.54 13.59a5.86 5.86 0 0 1 0-3.18V7.88H3.3a9.74 9.74 0 0 0 0 8.24l3.24-2.53Z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.5 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38Z"
                />

              </svg>

              Continue with Google

            </button>

          </form>

          <p className="mt-6 text-[11px] text-zinc-700">
            By continuing, you agree to use ScaleMind AI responsibly.
          </p>

        </div>

      </main>
    );
  }

  // =====================================================
  // AUTHENTICATED APP
  // =====================================================

  return (
    <main className="h-screen overflow-hidden bg-[#09090b] text-white">

      <ChatUI
        user={{
          name: session.user?.name ?? "User",
          email: session.user?.email ?? "",
          image: session.user?.image ?? null,
        }}
        onSignOut={signOutAction}
      />

    </main>
  );
}
