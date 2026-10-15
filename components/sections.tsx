import { RichText } from "@/components/rich-text";
import { imageUrl } from "@/lib/mapled";
import type {
  CallToActionComponent,
  FaqComponent,
  FeatureComponent,
  GalleryComponent,
  HeroComponent,
  MapledComponent,
  TestimonialComponent,
  TextComponent,
} from "@/mapled-types";

/** A page's Sections field, in the order editors set in Mapled. Features
    that follow each other share one row; FAQ items that follow each other
    share one list. A section type this code doesn't know yet is skipped. */
export function Sections({ sections }: { sections: MapledComponent[] }) {
  const groups: MapledComponent[][] = [];
  for (const section of sections) {
    const last = groups[groups.length - 1];
    const joins = last && (section._type === "feature" || section._type === "faq") && last[0]!._type === section._type;
    if (joins) last.push(section);
    else groups.push([section]);
  }

  return (
    <>
      {groups.map((group) => {
        const first = group[0]!;
        switch (first._type) {
          case "hero":
            return <Hero key={first._key} section={first} />;
          case "feature":
            return <Features key={first._key} sections={group as FeatureComponent[]} />;
          case "text":
            return <Text key={first._key} section={first} />;
          case "gallery":
            return <Gallery key={first._key} section={first} />;
          case "faq":
            return <Faq key={first._key} sections={group as FaqComponent[]} />;
          case "testimonial":
            return <Testimonial key={first._key} section={first} />;
          case "call-to-action":
            return <CallToAction key={first._key} section={first} />;
          default:
            return null;
        }
      })}
    </>
  );
}

function Button({ label, link }: { label?: string | null; link?: string | null }) {
  if (!label || !link) return null;
  return (
    <a className="button" href={link}>
      {label}
    </a>
  );
}

function Hero({ section }: { section: HeroComponent }) {
  return (
    <section className="section hero">
      <div className="container hero-inner">
        <div>
          <h1>{section.heading}</h1>
          {section.subheading ? <p className="lead">{section.subheading}</p> : null}
          <Button label={section["button-label"]} link={section["button-link"]} />
        </div>
        {section.image ? <img src={imageUrl(section.image, 1280)} alt="" /> : null}
      </div>
    </section>
  );
}

function Features({ sections }: { sections: FeatureComponent[] }) {
  return (
    <section className="section">
      <div className="container features">
        {sections.map((feature) => (
          <div key={feature._key} className="feature">
            {feature.image ? <img src={imageUrl(feature.image, 640)} alt="" /> : null}
            <h3>{feature.title}</h3>
            {feature.text ? <p>{feature.text}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Text({ section }: { section: TextComponent }) {
  return (
    <section className="section">
      <div className="container narrow">
        {section.heading ? <h2>{section.heading}</h2> : null}
        <RichText>{section.body}</RichText>
      </div>
    </section>
  );
}

function Gallery({ section }: { section: GalleryComponent }) {
  const images = [section["first-image"], section["second-image"], section["third-image"]].filter((id): id is string => Boolean(id));
  return (
    <section className="section">
      <div className="container">
        {section.heading ? <h2>{section.heading}</h2> : null}
        <div className="gallery">
          {images.map((id) => (
            <img key={id} src={imageUrl(id, 960)} alt="" />
          ))}
        </div>
        {section.caption ? <p className="muted">{section.caption}</p> : null}
      </div>
    </section>
  );
}

function Faq({ sections }: { sections: FaqComponent[] }) {
  return (
    <section className="section">
      <div className="container narrow">
        <h2>Questions</h2>
        {sections.map((item) => (
          <details key={item._key} className="faq">
            <summary>{item.question}</summary>
            <RichText>{item.answer}</RichText>
          </details>
        ))}
      </div>
    </section>
  );
}

function Testimonial({ section }: { section: TestimonialComponent }) {
  return (
    <section className="section">
      <figure className="container narrow testimonial">
        <blockquote>{section.quote}</blockquote>
        <figcaption>
          {section.photo ? <img src={imageUrl(section.photo, 128)} alt="" /> : null}
          <span>
            <strong>{section.name}</strong>
            {section.role ? <span className="muted"> · {section.role}</span> : null}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}

function CallToAction({ section }: { section: CallToActionComponent }) {
  return (
    <section className="section">
      <div className="container cta">
        <h2>{section.heading}</h2>
        {section.text ? <p>{section.text}</p> : null}
        <Button label={section["button-label"]} link={section["button-link"]} />
      </div>
    </section>
  );
}
