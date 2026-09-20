import { PageHero, ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This stop isn't on our route" text="The page you're looking for doesn't exist or has moved.">
      <div className="mt-8 flex justify-center gap-4"><ButtonLink href="/">Back home</ButtonLink><ButtonLink href="/visit" variant="outline">Plan your visit</ButtonLink></div>
    </PageHero>
  );
}
