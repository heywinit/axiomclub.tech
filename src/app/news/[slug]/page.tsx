import { getStory } from "./utils";
import { ClientArticle, MatrixOverlay } from "./components";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getStory(params.slug);

  return (
    <main className="min-h-screen relative bg-black py-16 px-4">
      <MatrixOverlay />
      <ClientArticle story={story} slug={params.slug} />
    </main>
  );
}
