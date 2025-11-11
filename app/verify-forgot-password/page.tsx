import { Suspense } from "react";
import VerifyForgotPasswordContent from "./_component/verify-forgot-password";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <VerifyForgotPasswordContent />
    </Suspense>
  );
}
