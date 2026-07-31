import { Suspense } from "react";
import AccountClient from "./AccountClient";

export const metadata = {
  title: "My Account - Staycation Villas",
  description: "Manage your bookings, saved villas, and account profile details.",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="account-loading-screen">Loading Account...</div>}>
      <AccountClient />
    </Suspense>
  );
}
