const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(process.cwd(), "src/data/names");

const REQUIRED_FIELDS = [
  "id",
  "slug",
  "name",
  "meaning",
  "pronunciation",
  "origin",
  "collections",
  "themes",
  "tags",
  "similar",
  "about",
  "featured",
];

const STRING_FIELDS = [
  "id",
  "slug",
  "name",
  "meaning",
  "pronunciation",
  "origin",
  "about",
];

const ARRAY_FIELDS = [
  "collections",
  "themes",
  "tags",
  "similar",
];

const files = fs
  .readdirSync(DATA_DIR)
  .filter((file) => /^[a-z]\.json$/.test(file))
  .sort();

const errors = [];
const warnings = [];
const names = [];

function error(message) {
  errors.push(`ERROR: ${message}`);
}

function warning(message) {
  warnings.push(`WARNING: ${message}`);
}

for (const file of files) {
  const letter = path.basename(file, ".json").toUpperCase();
  const filePath = path.join(DATA_DIR, file);

  let data;

  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    error(`${file}: invalid JSON`);
    continue;
  }

  if (!Array.isArray(data)) {
    error(`${file}: root value must be an array`);
    continue;
  }

  data.forEach((name, index) => {
    const location = `${file}[${index}]`;

    if (!name || typeof name !== "object" || Array.isArray(name)) {
      error(`${location}: entry must be an object`);
      return;
    }

    for (const field of REQUIRED_FIELDS) {
      if (!(field in name)) {
        error(`${location}: missing required field "${field}"`);
      }
    }

    for (const field of STRING_FIELDS) {
      if (field in name && typeof name[field] !== "string") {
        error(`${location}: "${field}" must be a string`);
      } else if (
        field in name &&
        typeof name[field] === "string" &&
        name[field].trim() === ""
      ) {
        error(`${location}: "${field}" cannot be empty`);
      }
    }

    for (const field of ARRAY_FIELDS) {
      if (field in name && !Array.isArray(name[field])) {
        error(`${location}: "${field}" must be an array`);
      }
    }

    if ("featured" in name && typeof name.featured !== "boolean") {
      error(`${location}: "featured" must be boolean`);
    }

    if (typeof name.name === "string") {
      const firstLetter = name.name.trim().charAt(0).toUpperCase();

      if (firstLetter !== letter) {
        error(
          `${location}: "${name.name}" is in ${letter}.json but starts with "${firstLetter}"`
        );
      }
    }

    if (
      typeof name.id === "string" &&
      !/^[a-z0-9-]+$/.test(name.id)
    ) {
      error(`${location}: invalid id "${name.id}"`);
    }

    if (
      typeof name.slug === "string" &&
      !/^[a-z0-9-]+$/.test(name.slug)
    ) {
      error(`${location}: invalid slug "${name.slug}"`);
    }

    names.push({
      ...name,
      __file: file,
      __location: location,
    });
  });
}

const ids = new Map();
const slugs = new Map();
const nameValues = new Map();

for (const name of names) {
  if (typeof name.id === "string") {
    if (ids.has(name.id)) {
      error(
        `duplicate id "${name.id}" (${ids.get(name.id)} and ${name.__location})`
      );
    } else {
      ids.set(name.id, name.__location);
    }
  }

  if (typeof name.slug === "string") {
    if (slugs.has(name.slug)) {
      error(
        `duplicate slug "${name.slug}" (${slugs.get(name.slug)} and ${name.__location})`
      );
    } else {
      slugs.set(name.slug, name.__location);
    }
  }

  if (typeof name.name === "string") {
    const normalized = name.name.trim().toLowerCase();

    if (nameValues.has(normalized)) {
      error(
        `duplicate name "${name.name}" (${nameValues.get(normalized)} and ${name.__location})`
      );
    } else {
      nameValues.set(normalized, name.__location);
    }
  }
}

const knownNames = new Set(
  names
    .filter((name) => typeof name.name === "string")
    .map((name) => name.name.toLowerCase())
);

for (const name of names) {
  if (!Array.isArray(name.similar)) continue;

  for (const similar of name.similar) {
    if (typeof similar !== "string" || similar.trim() === "") {
      error(`${name.__location}: invalid similar-name reference`);
      continue;
    }

    if (similar.toLowerCase() === name.name.toLowerCase()) {
      error(`${name.__location}: name cannot reference itself in "similar"`);
    }

    if (!knownNames.has(similar.toLowerCase())) {
      error(
        `${name.__location}: similar name "${similar}" does not exist`
      );
    }
  }
}

const indexPath = path.join(DATA_DIR, "index.ts");

if (fs.existsSync(indexPath)) {
  const indexSource = fs.readFileSync(indexPath, "utf8");

  for (const file of files) {
    const letter = path.basename(file, ".json");

    if (!indexSource.includes(`from "./${letter}.json"`)) {
      error(`index.ts does not import ${file}`);
    }
  }
}

console.log("");
console.log("NonbiNames Data Validation");
console.log("==========================");
console.log(`Files checked: ${files.length}`);
console.log(`Names checked: ${names.length}`);
console.log("");

if (warnings.length) {
  console.log(`Warnings: ${warnings.length}`);
  for (const message of warnings) {
    console.log(message);
  }
  console.log("");
}

if (errors.length) {
  console.log(`Errors: ${errors.length}`);
  for (const message of errors) {
    console.log(message);
  }
  console.log("");
  console.log("❌ Data validation failed.");
  process.exit(1);
}

console.log("✅ Data validation passed.");
