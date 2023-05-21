const ParseValueToSting = (value: any) => {
  if (Array.isArray(value)) return value.join(",");

  return value;
};

export const CollectUrl = (url: string, params: Object) => {
  const entries = Object.entries(params);
  const paramsStr = entries.reduce((acc, [key, value], index) => {
    return `${acc}${key}=${ParseValueToSting(value)}${
      index !== entries.length - 1 ? "&" : ""
    }`;
  }, "");

  return `${url}?${paramsStr}`;
};
