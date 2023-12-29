import LoginButton from "@/components/buttons/LoginButton";
import { getProviders } from "next-auth/react";

export default async function SignIn() {
  const providers: ReturnType<typeof getProviders> | Object =
    (await getProviders()) || {};
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.id} className="[&:not(:first-child)]:mt-4">
            <LoginButton auth={provider} />
          </div>
        );
      })}
    </div>
  );
}
