export interface Camping {
  type: string;
  id: string;
  title: string;
  field_camping_description: string;
  field_camping_map: FieldCampingMap;
  field_camping_price: string;
  field_checkin_checkout: string;
  links: FieldCampingCountryLinks;
  field_camping_country: FieldCamping;
  field_camping_image: FieldCampingImage;
  field_camping_location: FieldCamping;
  field_camping_owner: FieldCampingOwner;
  field_camping_tags: FieldCamping[];
  relationshipNames: string[];
}

export interface FieldCamping {
  type: string;
  id: string;
  drupal_internal__tid: number;
  drupal_internal__revision_id: number;
  langcode: Langcode;
  revision_created: Date;
  revision_log_message: null;
  status: boolean;
  name: string;
  description: null;
  weight: number;
  changed: Date;
  default_langcode: boolean;
  revision_translation_affected: boolean;
  path: Path;
  links: FieldCampingCountryLinks;
  resourceIdObjMeta: FieldCampingCountryResourceIDObjMeta;
  vid: Vid;
  revision_user: null;
  parent: Parent[];
  relationshipNames: RelationshipName[];
}

export enum Langcode {
  En = "en",
}

export interface FieldCampingCountryLinks {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Parent {
  type: string;
  id: string;
  resourceIdObjMeta: ParentResourceIDObjMeta;
}

export interface ParentResourceIDObjMeta {
  links: ResourceIDObjMetaLinks;
}

export interface ResourceIDObjMetaLinks {
  help: Help;
}

export interface Help {
  href: string;
  meta: Meta;
}

export interface Meta {
  about: string;
}

export interface Path {
  alias: null;
  pid: null;
  langcode: Langcode;
}

export enum RelationshipName {
  Parent = "parent",
  RevisionUser = "revision_user",
  Vid = "vid",
}

export interface FieldCampingCountryResourceIDObjMeta {
  drupal_internal__target_id: number;
}

export interface Vid {
  type: Type;
  id: string;
  resourceIdObjMeta: VidResourceIDObjMeta;
}

export interface VidResourceIDObjMeta {
  drupal_internal__target_id: string;
}

export enum Type {
  NodeTypeNodeType = "node_type--node_type",
  TaxonomyVocabularyTaxonomyVocabulary = "taxonomy_vocabulary--taxonomy_vocabulary",
}

export interface FieldCampingImage {
  type: string;
  id: string;
  drupal_internal__fid: number;
  langcode: Langcode;
  filename: string;
  uri: URI;
  filemime: string;
  filesize: number;
  status: boolean;
  created: Date;
  changed: Date;
  links: FieldCampingCountryLinks;
  resourceIdObjMeta: FieldCampingImageResourceIDObjMeta;
  uid: Uid;
  relationshipNames: string[];
}

export interface FieldCampingImageResourceIDObjMeta {
  alt: string;
  title: string;
  width: number;
  height: number;
  drupal_internal__target_id: number;
}

export interface Uid {
  type: string;
  id: string;
  resourceIdObjMeta: FieldCampingCountryResourceIDObjMeta;
}

export interface URI {
  value: string;
  url: string;
}

export interface FieldCampingMap {
  value: string;
  geo_type: string;
  lat: number;
  lon: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  geohash: string;
  latlon: string;
}

export interface FieldCampingOwner {
  type: string;
  id: string;
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: Langcode;
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
  field_owner_email: string;
  field_owner_phone: string;
  links: FieldCampingCountryLinks;
  resourceIdObjMeta: FieldCampingCountryResourceIDObjMeta;
  node_type: Vid;
  revision_uid: Uid;
  uid: Uid;
  relationshipNames: string[];
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
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "field_camping_description", js: "field_camping_description", typ: "" },
      { json: "field_camping_map", js: "field_camping_map", typ: r("FieldCampingMap") },
      { json: "field_camping_price", js: "field_camping_price", typ: "" },
      { json: "field_checkin_checkout", js: "field_checkin_checkout", typ: "" },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
      { json: "field_camping_country", js: "field_camping_country", typ: r("FieldCamping") },
      { json: "field_camping_image", js: "field_camping_image", typ: r("FieldCampingImage") },
      { json: "field_camping_location", js: "field_camping_location", typ: r("FieldCamping") },
      { json: "field_camping_owner", js: "field_camping_owner", typ: r("FieldCampingOwner") },
      { json: "field_camping_tags", js: "field_camping_tags", typ: a(r("FieldCamping")) },
      { json: "relationshipNames", js: "relationshipNames", typ: a("") },
    ],
    false
  ),
  FieldCamping: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "drupal_internal__tid", js: "drupal_internal__tid", typ: 0 },
      { json: "drupal_internal__revision_id", js: "drupal_internal__revision_id", typ: 0 },
      { json: "langcode", js: "langcode", typ: r("Langcode") },
      { json: "revision_created", js: "revision_created", typ: Date },
      { json: "revision_log_message", js: "revision_log_message", typ: null },
      { json: "status", js: "status", typ: true },
      { json: "name", js: "name", typ: "" },
      { json: "description", js: "description", typ: null },
      { json: "weight", js: "weight", typ: 0 },
      { json: "changed", js: "changed", typ: Date },
      { json: "default_langcode", js: "default_langcode", typ: true },
      { json: "revision_translation_affected", js: "revision_translation_affected", typ: true },
      { json: "path", js: "path", typ: r("Path") },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("FieldCampingCountryResourceIDObjMeta") },
      { json: "vid", js: "vid", typ: r("Vid") },
      { json: "revision_user", js: "revision_user", typ: null },
      { json: "parent", js: "parent", typ: a(r("Parent")) },
      { json: "relationshipNames", js: "relationshipNames", typ: a(r("RelationshipName")) },
    ],
    false
  ),
  FieldCampingCountryLinks: o([{ json: "self", js: "self", typ: r("Self") }], false),
  Self: o([{ json: "href", js: "href", typ: "" }], false),
  Parent: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("ParentResourceIDObjMeta") },
    ],
    false
  ),
  ParentResourceIDObjMeta: o([{ json: "links", js: "links", typ: r("ResourceIDObjMetaLinks") }], false),
  ResourceIDObjMetaLinks: o([{ json: "help", js: "help", typ: r("Help") }], false),
  Help: o(
    [
      { json: "href", js: "href", typ: "" },
      { json: "meta", js: "meta", typ: r("Meta") },
    ],
    false
  ),
  Meta: o([{ json: "about", js: "about", typ: "" }], false),
  Path: o(
    [
      { json: "alias", js: "alias", typ: null },
      { json: "pid", js: "pid", typ: null },
      { json: "langcode", js: "langcode", typ: r("Langcode") },
    ],
    false
  ),
  FieldCampingCountryResourceIDObjMeta: o([{ json: "drupal_internal__target_id", js: "drupal_internal__target_id", typ: 0 }], false),
  Vid: o(
    [
      { json: "type", js: "type", typ: r("Type") },
      { json: "id", js: "id", typ: "" },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("VidResourceIDObjMeta") },
    ],
    false
  ),
  VidResourceIDObjMeta: o([{ json: "drupal_internal__target_id", js: "drupal_internal__target_id", typ: "" }], false),
  FieldCampingImage: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "drupal_internal__fid", js: "drupal_internal__fid", typ: 0 },
      { json: "langcode", js: "langcode", typ: r("Langcode") },
      { json: "filename", js: "filename", typ: "" },
      { json: "uri", js: "uri", typ: r("URI") },
      { json: "filemime", js: "filemime", typ: "" },
      { json: "filesize", js: "filesize", typ: 0 },
      { json: "status", js: "status", typ: true },
      { json: "created", js: "created", typ: Date },
      { json: "changed", js: "changed", typ: Date },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("FieldCampingImageResourceIDObjMeta") },
      { json: "uid", js: "uid", typ: r("Uid") },
      { json: "relationshipNames", js: "relationshipNames", typ: a("") },
    ],
    false
  ),
  FieldCampingImageResourceIDObjMeta: o(
    [
      { json: "alt", js: "alt", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "width", js: "width", typ: 0 },
      { json: "height", js: "height", typ: 0 },
      { json: "drupal_internal__target_id", js: "drupal_internal__target_id", typ: 0 },
    ],
    false
  ),
  Uid: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("FieldCampingCountryResourceIDObjMeta") },
    ],
    false
  ),
  URI: o(
    [
      { json: "value", js: "value", typ: "" },
      { json: "url", js: "url", typ: "" },
    ],
    false
  ),
  FieldCampingMap: o(
    [
      { json: "value", js: "value", typ: "" },
      { json: "geo_type", js: "geo_type", typ: "" },
      { json: "lat", js: "lat", typ: 3.14 },
      { json: "lon", js: "lon", typ: 3.14 },
      { json: "left", js: "left", typ: 3.14 },
      { json: "top", js: "top", typ: 3.14 },
      { json: "right", js: "right", typ: 3.14 },
      { json: "bottom", js: "bottom", typ: 3.14 },
      { json: "geohash", js: "geohash", typ: "" },
      { json: "latlon", js: "latlon", typ: "" },
    ],
    false
  ),
  FieldCampingOwner: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "drupal_internal__nid", js: "drupal_internal__nid", typ: 0 },
      { json: "drupal_internal__vid", js: "drupal_internal__vid", typ: 0 },
      { json: "langcode", js: "langcode", typ: r("Langcode") },
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
      { json: "field_owner_email", js: "field_owner_email", typ: "" },
      { json: "field_owner_phone", js: "field_owner_phone", typ: "" },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("FieldCampingCountryResourceIDObjMeta") },
      { json: "node_type", js: "node_type", typ: r("Vid") },
      { json: "revision_uid", js: "revision_uid", typ: r("Uid") },
      { json: "uid", js: "uid", typ: r("Uid") },
      { json: "relationshipNames", js: "relationshipNames", typ: a("") },
    ],
    false
  ),
  Langcode: ["en"],
  RelationshipName: ["parent", "revision_user", "vid"],
  Type: ["node_type--node_type", "taxonomy_vocabulary--taxonomy_vocabulary"],
};
