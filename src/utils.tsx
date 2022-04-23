import ordinal from "ordinal";

export const replaceVariables = (
  value: string,
  item: { var1: string; var2: string; var3: string; var4: string }
) => {
  let replacedValue = value;
  replacedValue = replacedValue
    .replaceAll("{v1}", formatHeightenedVariables(item.var1))
    .replaceAll("{v2}", formatHeightenedVariables(item.var2))
    .replaceAll("{v3}", formatHeightenedVariables(item.var3))
    .replaceAll("{v4}", formatHeightenedVariables(item.var4));
  return replacedValue;
};

const formatHeightenedVariables = (str: string) => {
  const heightens = str.split("~");
  if (heightens.length <= 1) {
    return str;
  }

  heightens.forEach((heighten, index) => {
    const [level, effect] = heighten.split("#");

    if (index === 0) {
      heightens[index] = effect;
      return;
    }

    heightens[index] = `<span class="bold">Heightened (${ordinal(
      parseInt(level)
    )})</span> ${effect.trim()}`;
  });
  return `<span>${heightens.join("</span> <span>")}</span>`;
};
