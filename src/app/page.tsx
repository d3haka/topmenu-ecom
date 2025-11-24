import { redirect } from "next/navigation";

export default async function AppPage() {
  // await new Promise((res) => setTimeout(res, 5e3));
  redirect("/products");
}
