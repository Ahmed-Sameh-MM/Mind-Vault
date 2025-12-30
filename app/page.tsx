import { AuthButton } from "@/components/supabase/auth-button";
import { redirectIfUserAuthenticated } from "@/lib/auth/guards";

export default async function Home() {

  await redirectIfUserAuthenticated();

  return (
    <main>
      <h1>Mind Vault</h1>

      <br />

      <AuthButton />

      <br />

      <h2>We forget Important things all the time, why not just keep them in the Mind Vault?</h2>
    </main>
  );
}
