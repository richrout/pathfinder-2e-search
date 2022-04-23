import React, { useState } from "react";
import { pathbuilderData } from "./pathbuilder-data";
import Spell from "./Spell";
import Item from "./Item";
import { debounce } from "throttle-debounce";

console.log(pathbuilderData);
function Search() {
  const [spellResults, setSpellResults] = useState<any[]>([]);
  const [itemResults, setItemResults] = useState<any[]>([]);

  const search = (value: string) => {
    const searchValueLower = value.toLowerCase();
    const spells = pathbuilderData.spells.filter((s) =>
      s.name.toLowerCase().includes(searchValueLower)
    );

    setSpellResults(spells);

    const items = pathbuilderData.items_all.filter((s) =>
      s.name.toLowerCase().includes(searchValueLower)
    );
    setItemResults(items);
  };

  const searchDebounce = debounce(200, false, search);
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
            placeholder="Do a search"
            type="text"
          />
          <button className="input-button" style={{ fontSize: "24px" }}>
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
              aria-hidden="true"
              className="svg-inline--fa fa-times fa-w-11"
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {spellResults.map((r, i) => (
        <Spell key={i} spell={r} />
      ))}
      {itemResults.map((r, i) => (
        <Item key={i} item={r} />
      ))}
    </div>
  );
}

export default Search;
