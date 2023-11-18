const API_URL = "http://localhost:3000/api";
const character = API_URL[API_URL.length - 5];
const base =
  character == "0"
    ? "(DEV)"
    : character == "2"
    ? "(HML)"
    : character == "3"
    ? "(TEST)"
    : "( PRD )";

const Version = `1.0.25.0 ${base}`;
const HitSlop = { top: 30, bottom: 30, left: 30, right: 30 };

export { Version, API_URL, HitSlop };