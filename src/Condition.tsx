import { pathbuilderData } from "./pathbuilder-data";

function Condition({
  condition,
}: {
  condition: typeof pathbuilderData["conditions"][0];
}) {
  return (
    <section className="column gap-small limit-width fill-width-with-padding">
      <h2 className="title">
        <div className="row gap-small align-center">{condition.condition}</div>
        <div className="title-type">Condition</div>
      </h2>
      <h3 className="subtitle"></h3>
      <div
        dangerouslySetInnerHTML={{
          __html: condition.description,
        }}
      />
    </section>
  );
}

export default Condition;
