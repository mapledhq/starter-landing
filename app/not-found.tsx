import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow">
        <h1>Page not found</h1>
        <p className="lead">
          It may have been moved or unpublished. <Link href="/">Go to the home page</Link>.
        </p>
      </div>
    </section>
  );
}
