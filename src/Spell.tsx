import { pathbuilderData } from "./pathbuilder-data";
import { replaceVariables } from "./utils";

function Spell({ spell }: { spell: typeof pathbuilderData["spells"][0] }) {
  const traits = spell.traits.split(", ");
  return (
    <section className="column gap-small limit-width fill-width-with-padding">
      <h2 className="title">
        <div className="row gap-small align-center">
          <a href={spell.url} target="_blank">
            {spell.name}
          </a>
        </div>
        <div className="title-type">
          {spell.type} {spell.level}
        </div>
      </h2>
      <h3 className="subtitle"></h3>
      <div className="row">
        {traits.map((t, i) => (
          <div key={i} className={`trait trait-${t.toLowerCase()}`}>
            {t}
          </div>
        ))}
      </div>
      <div className="column gap-tiny">
        <div>
          <span className="bold">Source </span>
          <span>{spell.src || "Core Rulebook"}</span>
        </div>
        <div className="row">
          <div>
            <span className="bold">Cast </span>
            <span>
              <span className="icon-font">
                {spell.actions === "1" && "[one-action]"}
                {spell.actions === "2" && "[two-actions]"}
                {spell.actions === "3" && "[three-actions]"}
                {spell.actions === "0" && "[reaction]"}
              </span>
              <span> {spell.cast}</span>
            </span>
          </div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: replaceVariables(
            spell.description2 || spell.description,
            spell
          ),
        }}
      />
    </section>
  );
}

export default Spell;
