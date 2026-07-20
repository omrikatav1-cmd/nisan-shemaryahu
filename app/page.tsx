import HomeHub from "@/components/light/HomeHub";
import { buildHomeSchema } from "@/lib/schema";

export default function Home() {
  const schema = buildHomeSchema();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HomeHub />
    </>
  );
}
