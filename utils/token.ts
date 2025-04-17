import jwtDecode from "jwt-decode";

export function hasExpiredToken(token: string) {
  interface DecodedToken {
    exp: number;
  }
  const { exp } = jwtDecode<DecodedToken>(token);
  const currentDate = new Date().getDate();

  if (exp <= currentDate) {
    return true;
  }

  return false;
}
