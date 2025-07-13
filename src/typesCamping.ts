export interface Camping {
  jsonapi: Jsonapi;
  data: Datum[];
  links: DatumLinks;
}

export interface Datum {
  type: string;
  id: string;
  links: DatumLinks;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: string;
  revision_timestamp: Date;
  revision_log: null;
  status: boolean;
  title: string;
  created: Date;
  changed: Date;
  promote: boolean;
  sticky: boolean;
  default_langcode: boolean;
  revision_translation_affected: boolean;
  path: Path;
  field_camping_description: string;
  field_camping_price: string;
}

export interface Path {
  alias: null;
  pid: null;
  langcode: string;
}

export interface DatumLinks {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Relationships {
  node_type: NodeType;
  revision_uid: FieldCampingCountry;
  uid: FieldCampingCountry;
  field_camping_country: FieldCampingCountry;
  field_camping_image: FieldCampingImage;
  field_camping_location: FieldCampingCountry;
  field_camping_owner: FieldCampingCountry;
  field_camping_tags: FieldCampingTags;
}

export interface FieldCampingCountry {
  data: DAT;
  links: FieldCampingCountryLinks;
}

export interface DAT {
  type: string;
  id: string;
  meta: DatumMeta;
}

export interface DatumMeta {
  drupal_internal__target_id: number;
}

export interface FieldCampingCountryLinks {
  related: Self;
  self: Self;
}

export interface FieldCampingImage {
  data: FieldCampingImageData;
  links: FieldCampingCountryLinks;
}

export interface FieldCampingImageData {
  type: string;
  id: string;
  meta: PurpleMeta;
}

export interface PurpleMeta {
  alt: string;
  title: string;
  width: number;
  height: number;
  drupal_internal__target_id: number;
}

export interface FieldCampingTags {
  data: DAT[];
  links: FieldCampingCountryLinks;
}

export interface NodeType {
  data: NodeTypeData;
  links: FieldCampingCountryLinks;
}

export interface NodeTypeData {
  type: string;
  id: string;
  meta: FluffyMeta;
}

export interface FluffyMeta {
  drupal_internal__target_id: string;
}

export interface Jsonapi {
  version: string;
  meta: JsonapiMeta;
}

export interface JsonapiMeta {
  links: DatumLinks;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toCamping(json: string): Camping {
    return cast(JSON.parse(json), r("Camping"));
  }

  public static campingToJson(value: Camping): string {
    return JSON.stringify(uncast(value, r("Camping")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = "", parent: any = ""): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Camping: o(
    [
      { json: "jsonapi", js: "jsonapi", typ: r("Jsonapi") },
      { json: "data", js: "data", typ: a(r("Datum")) },
      { json: "links", js: "links", typ: r("DatumLinks") },
    ],
    false
  ),
  Datum: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "links", js: "links", typ: r("DatumLinks") },
      { json: "attributes", js: "attributes", typ: r("Attributes") },
      { json: "relationships", js: "relationships", typ: r("Relationships") },
    ],
    false
  ),
  Attributes: o(
    [
      { json: "drupal_internal__nid", js: "drupal_internal__nid", typ: 0 },
      { json: "drupal_internal__vid", js: "drupal_internal__vid", typ: 0 },
      { json: "langcode", js: "langcode", typ: "" },
      { json: "revision_timestamp", js: "revision_timestamp", typ: Date },
      { json: "revision_log", js: "revision_log", typ: null },
      { json: "status", js: "status", typ: true },
      { json: "title", js: "title", typ: "" },
      { json: "created", js: "created", typ: Date },
      { json: "changed", js: "changed", typ: Date },
      { json: "promote", js: "promote", typ: true },
      { json: "sticky", js: "sticky", typ: true },
      { json: "default_langcode", js: "default_langcode", typ: true },
      { json: "revision_translation_affected", js: "revision_translation_affected", typ: true },
      { json: "path", js: "path", typ: r("Path") },
      { json: "field_camping_description", js: "field_camping_description", typ: "" },
      { json: "field_camping_price", js: "field_camping_price", typ: "" },
    ],
    false
  ),
  Path: o(
    [
      { json: "alias", js: "alias", typ: null },
      { json: "pid", js: "pid", typ: null },
      { json: "langcode", js: "langcode", typ: "" },
    ],
    false
  ),
  DatumLinks: o([{ json: "self", js: "self", typ: r("Self") }], false),
  Self: o([{ json: "href", js: "href", typ: "" }], false),
  Relationships: o(
    [
      { json: "node_type", js: "node_type", typ: r("NodeType") },
      { json: "revision_uid", js: "revision_uid", typ: r("FieldCampingCountry") },
      { json: "uid", js: "uid", typ: r("FieldCampingCountry") },
      { json: "field_camping_country", js: "field_camping_country", typ: r("FieldCampingCountry") },
      { json: "field_camping_image", js: "field_camping_image", typ: r("FieldCampingImage") },
      { json: "field_camping_location", js: "field_camping_location", typ: r("FieldCampingCountry") },
      { json: "field_camping_owner", js: "field_camping_owner", typ: r("FieldCampingCountry") },
      { json: "field_camping_tags", js: "field_camping_tags", typ: r("FieldCampingTags") },
    ],
    false
  ),
  FieldCampingCountry: o(
    [
      { json: "data", js: "data", typ: r("DAT") },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
    ],
    false
  ),
  DAT: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "meta", js: "meta", typ: r("DatumMeta") },
    ],
    false
  ),
  DatumMeta: o([{ json: "drupal_internal__target_id", js: "drupal_internal__target_id", typ: 0 }], false),
  FieldCampingCountryLinks: o(
    [
      { json: "related", js: "related", typ: r("Self") },
      { json: "self", js: "self", typ: r("Self") },
    ],
    false
  ),
  FieldCampingImage: o(
    [
      { json: "data", js: "data", typ: r("FieldCampingImageData") },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
    ],
    false
  ),
  FieldCampingImageData: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "meta", js: "meta", typ: r("PurpleMeta") },
    ],
    false
  ),
  PurpleMeta: o(
    [
      { json: "alt", js: "alt", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "width", js: "width", typ: 0 },
      { json: "height", js: "height", typ: 0 },
      { json: "drupal_internal__target_id", js: "drupal_internal__target_id", typ: 0 },
    ],
    false
  ),
  FieldCampingTags: o(
    [
      { json: "data", js: "data", typ: a(r("DAT")) },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
    ],
    false
  ),
  NodeType: o(
    [
      { json: "data", js: "data", typ: r("NodeTypeData") },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
    ],
    false
  ),
  NodeTypeData: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "meta", js: "meta", typ: r("FluffyMeta") },
    ],
    false
  ),
  FluffyMeta: o([{ json: "drupal_internal__target_id", js: "drupal_internal__target_id", typ: "" }], false),
  Jsonapi: o(
    [
      { json: "version", js: "version", typ: "" },
      { json: "meta", js: "meta", typ: r("JsonapiMeta") },
    ],
    false
  ),
  JsonapiMeta: o([{ json: "links", js: "links", typ: r("DatumLinks") }], false),
};
