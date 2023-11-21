import IFormTextField from "../formTextField/types";

export default interface IAutoCompleteProps<T> extends IFormTextField {
  data: T[];
  defaultValue?: any;
  keyToExtract?: keyof T;
  keyToShow: keyof T;
  onEndScroll?: () => void;
}
