import { pathbuilderData } from "./pathbuilder-data";

export type FeatType =
  | typeof pathbuilderData["feats_general"][0]
  | typeof pathbuilderData["feats_archetype"][0]
  | typeof pathbuilderData["feats_ancestry_general"][0];

function Feat({ feat }: { feat: FeatType }) {
  const traits = feat.traits.split(", ");

  const type = (feat as any).__type || "Feat";
  return (
    <section className="column gap-small limit-width fill-width-with-padding">
      <h2 className="title">
        <div className="row gap-small align-center">
          <a href={feat.url} target="_blank">
            {feat.name}
            {feat.actions && (
              <span>
                {" "}
                <span className="icon-font">
                  {feat.actions === "1" && "[one-action]"}
                  {feat.actions === "2" && "[two-actions]"}
                  {feat.actions === "3" && "[three-actions]"}
                  {feat.actions === "0" && "[reaction]"}
                  {feat.actions === "-1" && "[free-action]"}
                </span>
              </span>
            )}
          </a>
        </div>
        <div className="title-type">
          {type} {feat.level}
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
      </div>
      <div className="column gap-tiny">
        <div>
          <span className="bold">Source </span>
          <span>{feat.src || "Core Rulebook"}</span>
        </div>
        <div className="row gap-medium">
          {"archetype" in feat && feat.archetype && (
            <div>
              <span className="bold">Archetype </span>
              <span>{feat.archetype}</span>
            </div>
          )}
          {"text_prereq" in feat && feat.text_prereq && (
            <div>
              <span className="bold">Prerequisite </span>
              <span>{feat.text_prereq}</span>
            </div>
          )}
          {"text_req" in feat && feat.text_req && (
            <div>
              <span className="bold">Requirements </span>
              <span>{feat.text_req}</span>
            </div>
          )}
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: feat.text_descrip,
        }}
      />
    </section>
  );
}

export default Feat;
