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

const stringSearch = (list: any[], searchValueLower: string) => {
  if (!searchValueLower?.trim()) {
    return [];
  }

  return list
    .filter((s) => s.name.toLowerCase().includes(searchValueLower))
    .sort((a, b) => {
      if (
        a.name.toLowerCase().indexOf(searchValueLower) >
        b.name.toLowerCase().indexOf(searchValueLower)
      ) {
        return 1;
      } else if (
        a.name.toLowerCase().indexOf(searchValueLower) <
        b.name.toLowerCase().indexOf(searchValueLower)
      ) {
        return -1;
      } else {
        if (a.name > b.name) return 1;
        else return -1;
      }
    });
};

function Search() {
  const [spellResults, setSpellResults] = useState<any[]>([]);
  const [itemResults, setItemResults] = useState<any[]>([]);
  const [conditionResults, setConditionResults] = useState<any[]>([]);
  const [featResults, setFeatResults] = useState<any[]>([]);
  const [searchCategories, setSearchCategories] = useState<string[]>([]);

  const search = (value: string, categories = searchCategories) => {
    const searchValueLower = value.toLowerCase();

    if (categories.includes("spells") || !categories.length) {
      const spells = stringSearch(pathbuilderData.spells, searchValueLower);
      setSpellResults(spells.slice(0, 20));
    } else {
      setSpellResults([]);
    }

    if (categories.includes("items") || !categories.length) {
      const items = stringSearch(allItems, searchValueLower);
      setItemResults(items.slice(0, 20));
    } else {
      setItemResults([]);
    }

    if (categories.includes("conditions") || !categories.length) {
      const conditions = pathbuilderData.conditions.filter((s) =>
        s.condition.toLowerCase().includes(searchValueLower)
      );

      setConditionResults(conditions.slice(0, 20));
    } else {
      setConditionResults([]);
    }

    if (categories.includes("feats") || !categories.length) {
      const feats = stringSearch(allFeats, searchValueLower);
      setFeatResults(feats.slice(0, 20));
    } else {
      setFeatResults([]);
    }
  };

  const searchDebounce = debounce(300, false, search);
  const searchChanged: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    searchDebounce(event.currentTarget.value);
  };

  const filterChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    let newSearchCategories: string[] = [];
    if (searchCategories.includes(value)) {
      newSearchCategories = searchCategories.filter((s) => s !== value);
    } else {
      newSearchCategories = [value];
    }
    setSearchCategories(newSearchCategories);
    search(
      (document.getElementById("search-filter") as HTMLInputElement)?.value,
      newSearchCategories
    );
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
            placeholder="Search for spells, items, feats or conditions"
            type="text"
            id="search-filter"
          />
        </div>
        <div className="row row-center">
          <input
            checked={searchCategories.includes("spells")}
            onChange={filterChanged}
            className="checkbox-input"
            type="checkbox"
            value="spells"
            id="spells-filter"
          />
          <label htmlFor="spells-filter" className="checkbox-label">
            Spells
          </label>

          <input
            checked={searchCategories.includes("feats")}
            onChange={filterChanged}
            className="checkbox-input"
            type="checkbox"
            value="feats"
            id="feats-filter"
          />
          <label htmlFor="feats-filter" className="checkbox-label">
            Feats
          </label>

          <input
            checked={searchCategories.includes("items")}
            onChange={filterChanged}
            className="checkbox-input"
            type="checkbox"
            value="items"
            id="items-filter"
          />
          <label htmlFor="items-filter" className="checkbox-label">
            Items
          </label>

          <input
            checked={searchCategories.includes("conditions")}
            onChange={filterChanged}
            className="checkbox-input"
            type="checkbox"
            value="conditions"
            id="conditions-filter"
          />
          <label htmlFor="conditions-filter" className="checkbox-label">
            Conditions
          </label>
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
        <Feat key={feat.id + feat.name + feat.url} feat={feat} />
      ))}
    </div>
  );
}

export default Search;
