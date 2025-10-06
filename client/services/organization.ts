import { url } from "../app/url";

export async function registerOrganization(
  name: string,
  email: string,
  password: string,
  address?: string,
  timing?: string
) {
  return url<{ message: string }>("/organization/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, address, timing }),
  });
}

export async function loginOrganization(email: string, password: string) {
  return url<{ token: string; organization: any }>("/organization/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
