export type RecaptchaVerifyResult = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptcha(
  token: string,
  secretKey: string
): Promise<RecaptchaVerifyResult> {
  const params = new URLSearchParams({ secret: secretKey, response: token });

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  return res.json();
}
