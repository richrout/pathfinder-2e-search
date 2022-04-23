import { pathbuilderData } from "./pathbuilder-data";
function Spell({ spell }: { spell: typeof pathbuilderData["spells"][0] }) {
  const traits = spell.traits.split(", ");
  console.log(spell);
  return (
    <section className="column gap-small limit-width fill-width-with-padding">
      <h2 className="title">
        <div className="row gap-small align-center">
          <svg viewBox="0 0 100 100" height="1em">
            <circle cx="50" cy="50" r="50" fill="#4ab5f1"></circle>
            <circle cx="50" cy="50" r="40" fill="#94805d"></circle>
          </svg>
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
        {traits.map((t) => (
          <div key={t} className="trait">
            {t}
          </div>
        ))}
      </div>
      <div className="column gap-tiny">
        <div>
          <span className="bold">Source </span>
          <span>{spell.src || "Core Rulebook"}</span>
        </div>
        <div className="row gap-medium"></div>
        <div className="row gap-medium">
          <div>
            <span className="bold">Cast </span>
            <span>
              <span className="icon-font">
                {spell.actions === "1" && "[one-action]"}
                {spell.actions === "2" && "[two-actions]"}
                {spell.actions === "3" && "[three-actions]"}
                {spell.actions === "0" && "[reaction]"}
              </span>
            </span>
          </div>
          <div>
            <span className="bold">Components </span>
            <span>{spell.cast}</span>
          </div>
        </div>
        <div className="row gap-medium">
          <div>
            <span className="bold">Range </span>
            <span>{spell.range}</span>
          </div>
          <div>
            <span className="bold">Targets </span>
            <span>{spell.target}</span>
          </div>
        </div>
        <div className="row gap-medium">
          <div>
            <span className="bold">Duration </span>
            <span>{spell.duration}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Spell;
