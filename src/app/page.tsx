import HomeClient from "@/components/HomeClient";

// Page is now static-shell friendly and does not block on DB connection
export default function HomePage() {
  return <HomeClient />;
}
