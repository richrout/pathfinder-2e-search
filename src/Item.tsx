import { pathbuilderData } from "./pathbuilder-data";

function Item({ item }: { item: typeof pathbuilderData["items_all"][0] }) {
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
        {traits
          .filter((t) => t)
          .map((t, i) => (
            <div key={i} className={`trait trait-${t.toLowerCase()}`}>
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
          {item.usage && (
            <div>
              <span className="bold">Usage </span>
              <span>{item.usage}</span>
            </div>
          )}
          {item.bulk && (
            <div>
              <span className="bold">Bulk </span>
              <span>{item.bulk}</span>
            </div>
          )}
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: item.description,
        }}
      />
      {item.action0 && (
        <div className="row">
          <div>
            <span className="bold">Activate </span>
            <span>
              <span className="icon-font">
                {item.action0 === "1" && "[one-action]"}
                {item.action0 === "2" && "[two-actions]"}
                {item.action0 === "3" && "[three-actions]"}
                {item.action0 === "0" && "[reaction]"}
              </span>{" "}
              <span dangerouslySetInnerHTML={{ __html: item.action0desc }} />
            </span>
          </div>
        </div>
      )}
      {item.action1 && (
        <div className="row">
          <div>
            <span className="bold">Activate </span>
            <span>
              <span className="icon-font">
                {item.action1 === "1" && "[one-action]"}
                {item.action1 === "2" && "[two-actions]"}
                {item.action1 === "3" && "[three-actions]"}
                {item.action1 === "0" && "[reaction]"}
              </span>{" "}
              <span dangerouslySetInnerHTML={{ __html: item.action1desc }} />
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default Item;
