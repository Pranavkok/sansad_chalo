import Link from "next/link";
import { auth, signIn, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-foreground/10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center gap-2">
            <span aria-hidden className="flex size-8 items-center justify-center bg-acid font-display text-lg text-background">
              ✊
            </span>
            <span className="font-display text-lg tracking-wide uppercase">
              Sansad<span className="text-acid">Chalo</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 font-mono text-xs tracking-widest uppercase sm:flex">
            <Link
              href="/about"
              className="text-foreground/60 transition-colors hover:text-acid"
            >
              Why we march
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <nav className="flex items-center gap-2">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="font-mono text-xs tracking-widest uppercase">
                    My Card
                  </Button>
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button
                    variant="outline"
                    type="submit"
                    className="font-mono text-xs tracking-widest uppercase"
                  >
                    Sign Out
                  </Button>
                </form>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/dashboard" });
                }}
              >
                <Button
                  type="submit"
                  className="border-2 border-foreground bg-acid font-display tracking-wide text-background uppercase hover:bg-acid/90"
                >
                  Join the march
                </Button>
              </form>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
