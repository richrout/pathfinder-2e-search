import React, { useState } from "react";
import { pathbuilderData } from "./pathbuilder-data";
import Spell from "./Spell";
import Item from "./Item";
import { debounce } from "throttle-debounce";
import Condition from "./Condition";
import Feat, { FeatType } from "./Feat";

const allKeys = Object.keys(pathbuilderData);
const featKeys = allKeys.filter((k) => k.startsWith("feats_"));

const allFeats: FeatType[] = [];
for (const featName of featKeys) {
  const feats = (pathbuilderData as any)[featName];
  allFeats.push(...feats);
}

const allItems = [
  ...pathbuilderData.items_all,
  ...pathbuilderData.items_armor.map((a) => ({ ...a, __type: "Armor" })),
  ...pathbuilderData.items_armor_magic.map((a) => ({
    ...a,
    __type: "Magical Armor",
  })),
  ...pathbuilderData.items_fundamental_runes.map((a) => ({
    ...a,
    __type: "Fundamental Rune",
  })),
  ...pathbuilderData.items_materials_armor.map((a) => ({
    ...a,
    __type: "Armor Material",
  })),
  ...pathbuilderData.items_materials_weapons.map((a) => ({
    ...a,
    __type: "Weapon Material",
  })),
  ...pathbuilderData.items_property_runes_armor.map((a) => ({
    ...a,
    __type: "Armor Property Rune",
  })),
  ...pathbuilderData.items_property_runes_shields.map((a) => ({
    ...a,
    __type: "Shield Property Rune",
  })),
  ...pathbuilderData.items_property_runes_weapons.map((a) => ({
    ...a,
    __type: "Weapon Property Rune",
  })),
  ...pathbuilderData.items_shields.map((a) => ({ ...a, __type: "Shield" })),
  ...pathbuilderData.items_weapons.map((a) => ({ ...a, __type: "Weapon" })),
  ...pathbuilderData.items_weapons_magic.map((a) => ({
    ...a,
    __type: "Magic Weapon",
  })),
];

function Search() {
  const [spellResults, setSpellResults] = useState<any[]>([]);
  const [itemResults, setItemResults] = useState<any[]>([]);
  const [conditionResults, setConditionResults] = useState<any[]>([]);
  const [featResults, setFeatResults] = useState<any[]>([]);

  const search = (value: string) => {
    const searchValueLower = value.toLowerCase();
    const spells = pathbuilderData.spells.filter((s) =>
      s.name.toLowerCase().includes(searchValueLower)
    );

    setSpellResults(spells.slice(0, 20));

    const items = allItems.filter((s) =>
      s.name.toLowerCase().includes(searchValueLower)
    );

    setItemResults(items.slice(0, 20));

    const conditions = pathbuilderData.conditions.filter((s) =>
      s.condition.toLowerCase().includes(searchValueLower)
    );

    setConditionResults(conditions.slice(0, 20));

    const feats = allFeats.filter((s) =>
      s.name.toLowerCase().includes(searchValueLower)
    );

    setFeatResults(feats.slice(0, 20));
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
      {featResults.map((feat) => (
        <Feat key={feat.name + feat.url} feat={feat} />
      ))}
    </div>
  );
}

export default Search;
