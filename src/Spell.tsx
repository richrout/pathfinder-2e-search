import ordinal from "ordinal";
import { useState } from "react";
import { pathbuilderData } from "./pathbuilder-data";
import { replaceVariables } from "./utils";

function Spell({ spell }: { spell: typeof pathbuilderData["spells"][0] }) {
  const initialSpellLevel = parseInt(spell.level);
  const heightenArray = Array.from(
    { length: 11 - initialSpellLevel },
    (_, i) => i + initialSpellLevel
  );
  const [heighten, setHeighten] = useState<number>(initialSpellLevel);

  const heightenChanged: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setHeighten(parseInt(e.target.value));
  };

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
        {traits
          .filter((t) => t)
          .map((t, i) => (
            <div key={i} className={`trait trait-${t.toLowerCase()}`}>
              {t}
            </div>
          ))}
        <div className="heighten-select bold">
          Auto Heighten{" "}
          <select
            value={heighten.toString()}
            onChange={heightenChanged}
            name="heighten"
          >
            {heightenArray.map((value) => (
              <option key={value} value={value.toString()}>
                {ordinal(value)} (+{value - initialSpellLevel})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="column gap-tiny">
        <div>
          <span className="bold">Source </span>
          <span>{spell.src || "Core Rulebook"}</span>
        </div>
        <div className="row">
          <div>
            <span className="bold">Cast </span>
            {spell.cast === "1 to 3 actions" ? (
              <span>
                <span className="icon-font">[one-action]</span> to{" "}
                <span className="icon-font">[three-actions]</span> actions
              </span>
            ) : (
              <span>
                <span className="icon-font">
                  {spell.actions === "1" && "[one-action]"}
                  {spell.actions === "2" && "[two-actions]"}
                  {spell.actions === "3" && "[three-actions]"}
                  {spell.actions === "0" && "[reaction]"}
                  {spell.actions === "-1" && "[free-action]"}
                </span>{" "}
                <span dangerouslySetInnerHTML={{ __html: spell.cast }}></span>
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: replaceVariables(
            spell.description2 || spell.description,
            spell,
            heighten
          ),
        }}
      />
    </section>
  );
}

export default Spell;
