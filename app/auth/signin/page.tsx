import LoginButton from "@/components/buttons/LoginButton";
import { getProviders } from "next-auth/react";

export default async function SignIn() {
  // const providers: ReturnType<typeof getProviders> = (await getProviders()) || {};
  const providers = await getProviders();
  if (providers)
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
