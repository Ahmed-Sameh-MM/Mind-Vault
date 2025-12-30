import { redirectIfUserAuthenticated } from "@/lib/auth/guards";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await redirectIfUserAuthenticated();

  return <>{children}</>;
}
