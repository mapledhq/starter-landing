import Markdown from "react-markdown";

/** Rich text fields are Markdown. react-markdown renders it as elements and
    never as raw HTML, so an editor's text can't inject markup into the page. */
export function RichText({ children }: { children: string | null | undefined }) {
  if (!children) return null;
  return (
    <div className="prose">
      <Markdown>{children}</Markdown>
    </div>
  );
}
