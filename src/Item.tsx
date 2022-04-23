import { pathbuilderData } from "./pathbuilder-data";
function Item({ item }: { item: typeof pathbuilderData["items_all"][0] }) {
  console.log(item);
  const traits = item.traits.split(", ");
  return (
    <section className="column gap-small limit-width fill-width-with-padding">
      <h2 className="title">
        <div className="row gap-small align-center">
          <a href={item.url} target="_blank">
            {item.name}
          </a>
        </div>
        <div className="title-type">Item {item.level}</div>
      </h2>
      <h3 className="subtitle"></h3>
      <div className="row">
        {traits.map((t) => (
          <div key={t} className={`trait trait-${t.toLowerCase()}`}>
            {t}
          </div>
        ))}
      </div>
      <div className="column gap-tiny">
        <div>
          <span className="bold">Source </span>
          <span>{item.src || "Core Rulebook"}</span>
        </div>
        {item.price && item.price !== "0" && (
          <div>
            <span className="bold">Price </span>
            <span>{item.price} gp</span>
          </div>
        )}
        <div className="row gap-medium">
          <div>
            <span className="bold">Usage </span>
            <span>{item.usage}</span>
          </div>
          <div>
            <span className="bold">Bulk </span>
            <span>{item.bulk}</span>
          </div>
        </div>
        <div className="row gap-medium">
          <div>
            <span className="bold">Activate </span>
            <span>
              <span className="icon-font">[one-action]</span> interact
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Item;
