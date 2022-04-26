import ordinal from "ordinal";

export const replaceVariables = (
  value: string,
  item: {
    level: string;
    var1: string;
    var2: string;
    var3: string;
    var4: string;
  },
  heighten: number
) => {
  const heightenDiff = heighten - parseInt(item.level);
  const incReplacer = (_match: string, p1: string, p2: string) => {
    if (heightenDiff <= 0) {
      return p1;
    }
    return `<span class="auto-heighten" title="Heightened from ${p1}">${(
      parseInt(p1) +
      parseInt(p2) * heightenDiff
    ).toString()}</span>`;
  };

  let replacedValue = value;
  replacedValue = replacedValue
    .replaceAll("{v1}", formatHeightenedVariables(item.var1, heighten))
    .replaceAll("{v2}", formatHeightenedVariables(item.var2, heighten))
    .replaceAll("{v3}", formatHeightenedVariables(item.var3, heighten))
    .replaceAll("{v4}", formatHeightenedVariables(item.var4, heighten))
    .replaceAll("MOD", "your spell casting ability modifier")
    .replaceAll("[free-action]", `<span class="icon-font">[free-action]</span>`)
    .replaceAll("[reaction]", `<span class="icon-font">[reaction]</span>`)
    .replaceAll("1 action ", `<span class="icon-font">[one-action]</span> `)
    .replaceAll("[one-action]", `<span class="icon-font">[one-action]</span>`)
    .replaceAll("2 actions ", `<span class="icon-font">[two-actions]</span> `)
    .replaceAll("[two-actions]", `<span class="icon-font">[two-actions]</span>`)
    .replaceAll("3 actions ", `<span class="icon-font">[three-actions]</span> `)
    .replaceAll(
      "[three-actions]",
      `<span class="icon-font">[three-actions]</span>`
    )
    .replace(/INC (\d+)\+(\d+)/g, incReplacer);
  return replacedValue;
};

const formatHeightenedVariables = (str: string, heighten: number) => {
  const heightens = str.split("~");
  if (heightens.length <= 1) {
    return str;
  }

  let chosenEffect = str;
  let heightenTimes = 0;

  heightens.forEach((item) => {
    const [level, effect] = item.split("#");
    const levelNumber = parseInt(level);

    if (levelNumber <= heighten) {
      chosenEffect = effect;
      heightenTimes++;
    }
  });

  return `<span class="${
    heightenTimes > 1 ? "auto-heighten" : ""
  }">${chosenEffect}</span>`;
};
