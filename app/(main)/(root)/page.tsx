import { auth, signOut } from "@/auth";
import { Button, Link } from "@nextui-org/react";

export default async function Home() {
  const session = await auth();

  return (
    <div className="h-auto min-h-screen flex flex-col items-center justify-center">
      <Link
        href="/auth/sign-in"
        color="secondary"
        className="px-2 py-1 rounded-xl border border-purple-600"
      >
        Login
      </Link>
      {JSON.stringify(session)}
      {session !== null && (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">SignOut</Button>
        </form>
      )}
    </div>
  );
}
