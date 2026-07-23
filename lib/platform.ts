export const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const ADVERTISER_APP = process.env.NEXT_PUBLIC_ADVERTISER_URL;

/**
 * Whether the advertiser app is configured for this build. NEXT_PUBLIC_* vars
 * are inlined at build time, so this resolves to a constant in the bundle.
 */
export const HAS_ADVERTISER_APP = Boolean(ADVERTISER_APP);

export const ADVERTISER_URL = ADVERTISER_APP ?? "http://localhost:8002";

/**
 * Signup/login destinations. When the advertiser app URL is not configured
 * (e.g. a production build made before the platform is hosted), fall back to
 * the contact page rather than shipping a dead localhost link to visitors.
 */
export const SIGNUP_URL = ADVERTISER_APP ? `${ADVERTISER_APP}/signup` : "/contact";
export const LOGIN_URL = ADVERTISER_APP ? `${ADVERTISER_APP}/login` : "/contact";
