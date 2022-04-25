import React, { useState } from "react";
import { pathbuilderData } from "./pathbuilder-data";
import Spell from "./Spell";
import Item from "./Item";
import { debounce } from "throttle-debounce";
import Condition from "./Condition";

function Search() {
  const [spellResults, setSpellResults] = useState<any[]>([]);
  const [itemResults, setItemResults] = useState<any[]>([]);
  const [conditionResults, setConditionResults] = useState<any[]>([]);

  const search = (value: string) => {
    const searchValueLower = value.toLowerCase();
    const spells = pathbuilderData.spells.filter((s) =>
      s.name.toLowerCase().includes(searchValueLower)
    );

    setSpellResults(spells.slice(0, 20));

    const items = pathbuilderData.items_all.filter((s) =>
      s.name.toLowerCase().includes(searchValueLower)
    );

    setItemResults(items.slice(0, 20));

    const conditions = pathbuilderData.conditions.filter((s) =>
      s.condition.toLowerCase().includes(searchValueLower)
    );

    setConditionResults(conditions.slice(0, 20));
  };

  const searchDebounce = debounce(300, false, search);
  const searchChanged: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    searchDebounce(event.currentTarget.value);
  };

  return (
    <div
      className="column gap-large align-center"
      style={{ alignSelf: "stretch", minHeight: "90vh", paddingBottom: "8px" }}
    >
      <div className="column align-stretch limit-width gap-tiny fill-width-with-padding">
        <div className="row input-container">
          <input
            autoFocus
            onKeyUp={searchChanged}
            className="query-input"
            placeholder="Search for a spell or item"
            type="text"
          />
        </div>
      </div>
      {spellResults.map((spell) => (
        <Spell key={spell.name + spell.url} spell={spell} />
      ))}
      {itemResults.map((item) => (
        <Item key={item.name + item.url} item={item} />
      ))}
      {conditionResults.map((condition) => (
        <Condition key={condition.condition} condition={condition} />
      ))}
    </div>
  );
}

export default Search;
