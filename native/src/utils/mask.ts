import type {
  FormatWithMaskProps,
  FormatWithMaskResult,
  CleanUpMask,
  CreateNumberMaskProps,
  Mask,
  MaskArray,
  CustomMask,
  FormatNumberOptions,
} from "@models/Regex";
interface AddSignPrefixAndSuffixProps {
  sign?: "+" | "-" | "";
  prefix?: string;
  suffix?: string;
  signPosition: "beforePrefix" | "afterPrefix";
}

export const addSignPrefixAndSuffix = (
  value: any,
  options: AddSignPrefixAndSuffixProps
) => {
  const { prefix, sign, suffix, signPosition } = options;

  switch (signPosition) {
    case "beforePrefix":
      return `${sign}${prefix}${value}${suffix}`;
    case "afterPrefix":
      return `${prefix}${sign}${value}${suffix}`;
  }
};

export const formatCurrency = (
  input: number,
  options?: FormatNumberOptions
) => {
  const {
    precision,
    separator = ",",
    delimiter = ".",
    prefix = "",
    suffix = "",
    ignoreNegative,
    showPositiveSign,
    signPosition = "afterPrefix",
  } = options || {};

  const negative = ignoreNegative ? false : input < 0;
  const sign = negative ? "-" : showPositiveSign ? "+" : "";

  const string = Math.abs(input).toFixed(precision);

  const parts = string.split(".");
  const buffer = [];

  let number = parts[0];
  while (number.length > 0) {
    buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
    number = number.substr(0, number.length - 3);
  }

  let formattedNumber = "";
  formattedNumber = buffer.join(delimiter);

  const decimals = parts[1];
  if (!!precision && decimals) {
    formattedNumber += separator + decimals;
  }

  return addSignPrefixAndSuffix(formattedNumber, {
    prefix,
    suffix,
    sign,
    signPosition,
  });
};

export function formatWithMask(
  props: FormatWithMaskProps
): FormatWithMaskResult {
  const { text, mask, obfuscationCharacter = "*" } = props;

  // make sure it'll not break with null or undefined inputs
  if (!text) return { masked: "", unmasked: "", obfuscated: "" };
  if (!mask)
    return {
      masked: text || "",
      unmasked: text || "",
      obfuscated: text || "",
    };

  const maskArray = typeof mask === "function" ? mask(text) : mask;

  let masked = "";
  let obfuscated = "";
  let unmasked = "";

  let maskCharIndex = 0;
  let valueCharIndex = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // if mask is ended, break.
    if (maskCharIndex === maskArray.length) {
      break;
    }

    // if value is ended, break.
    if (valueCharIndex === text.length) {
      break;
    }

    const maskChar = maskArray[maskCharIndex];
    const valueChar = text[valueCharIndex];

    // value equals mask: add to masked result and advance on both mask and value indexes
    if (maskChar === valueChar) {
      masked += maskChar;
      obfuscated += maskChar;

      valueCharIndex += 1;
      maskCharIndex += 1;
      continue;
    }

    const unmaskedValueChar = text[valueCharIndex];

    // it's a regex maskChar: let's advance on value index and validate the value within the regex
    if (typeof maskChar === "object") {
      // advance on value index
      valueCharIndex += 1;

      const shouldObsfucateChar = Array.isArray(maskChar);

      const maskCharRegex = Array.isArray(maskChar) ? maskChar[0] : maskChar;

      const matchRegex = RegExp(maskCharRegex).test(valueChar);

      // value match regex: add to masked and unmasked result and advance on mask index too
      if (matchRegex) {
        masked += valueChar;
        obfuscated += shouldObsfucateChar ? obfuscationCharacter : valueChar;
        unmasked += unmaskedValueChar;

        maskCharIndex += 1;
      }

      continue;
    } else {
      // it's a fixed maskChar: add to maskedResult and advance on mask index
      masked += maskChar;
      obfuscated += maskChar;

      maskCharIndex += 1;
      continue;
    }
  }

  return { masked, unmasked, obfuscated };
}

export function cleanUpMask(
  valueToClean: CleanUpMask,
  customCleanUp?: CustomMask
) {
  if (customCleanUp) {
    return valueToClean.replace(customCleanUp, "");
  }

  return valueToClean.replace(/\W/g, "");
}

export function createNumberMask(props?: CreateNumberMaskProps): Mask {
  const {
    delimiter = ".",
    precision = 2,
    prefix = [],
    suffix = [],
    separator = ",",
  } = props || {};

  return (value?: string) => {
    const numericValue = value?.replace(/\D+/g, "") || "";

    const mask: MaskArray = numericValue.split("").map(() => /\d/);

    const shouldAddSeparatorOnMask = precision > 0 && !!separator;

    if (mask.length > precision && shouldAddSeparatorOnMask) {
      mask.splice(-precision, 0, separator);
    }

    const amountOfDelimiters =
      Math.ceil((numericValue.length - precision) / 3) - 1;

    if (delimiter) {
      for (let i = 0; i < amountOfDelimiters; i++) {
        const precisionOffset = precision;
        const separatorOffset = shouldAddSeparatorOnMask ? 1 : 0;
        const thousandOffset = 3 + (delimiter ? 1 : 0);
        const delimiterPosition =
          -precisionOffset - separatorOffset - i * thousandOffset - 3;

        mask.splice(delimiterPosition, 0, delimiter);
      }
    }

    return [...prefix, ...mask, ...suffix];
  };
}
