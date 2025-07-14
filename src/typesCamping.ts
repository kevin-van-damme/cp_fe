export interface Camping {
  type: CampingType;
  id: string;
  title: string;
  field_camping_description: string;
  field_camping_price: string;
  links: FieldCampingCountryLinks;
  field_camping_country: FieldCamping;
  field_camping_image: FieldCampingImage;
  field_camping_location: FieldCamping;
  field_camping_owner: FieldCampingOwner;
  field_camping_tags: FieldCampingTag[];
  relationshipNames: CampingRelationshipName[];
}

export interface FieldCamping {
  type: ParentType;
  id: string;
  drupal_internal__tid: number;
  drupal_internal__revision_id: number;
  langcode: Langcode;
  revision_created: Date;
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
  relationshipNames: FieldCampingCountryRelationshipName[];
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
  type: ParentType;
  id: ID;
  resourceIdObjMeta: ParentResourceIDObjMeta;
}

export enum ID {
  Virtual = "virtual",
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
  about: About;
}

export enum About {
  UsageAndMeaningOfTheMissingResourceIdentifier = "Usage and meaning of the 'missing' resource identifier.",
  UsageAndMeaningOfTheVirtualResourceIdentifier = "Usage and meaning of the 'virtual' resource identifier.",
}

export enum ParentType {
  TaxonomyTermCategoriesCamping = "taxonomy_term--categories_camping",
  TaxonomyTermCitiesBelgium = "taxonomy_term--cities_belgium",
  TaxonomyTermCountries = "taxonomy_term--countries",
}

export interface Path {
  alias: null;
  pid: null;
  langcode: Langcode;
}

export enum FieldCampingCountryRelationshipName {
  Parent = "parent",
  RevisionUser = "revision_user",
  Vid = "vid",
}

export interface FieldCampingCountryResourceIDObjMeta {
  drupal_internal__target_id: number;
}

export interface Vid {
  type: VidType;
  id: string;
  resourceIdObjMeta: VidResourceIDObjMeta;
}

export interface VidResourceIDObjMeta {
  drupal_internal__target_id: DrupalInternalTargetID;
}

export enum DrupalInternalTargetID {
  CategoriesCamping = "categories_camping",
  CitiesBelgium = "cities_belgium",
  Countries = "countries",
  Owner = "owner",
}

export enum VidType {
  NodeTypeNodeType = "node_type--node_type",
  TaxonomyVocabularyTaxonomyVocabulary = "taxonomy_vocabulary--taxonomy_vocabulary",
}

export interface FieldCampingImage {
  type: FieldCampingImageType;
  id: string;
  drupal_internal__fid: number;
  langcode: Langcode;
  filename: string;
  uri: URI;
  filemime: Filemime;
  filesize: number;
  status: boolean;
  created: Date;
  changed: Date;
  links: FieldCampingCountryLinks;
  resourceIdObjMeta: FieldCampingImageResourceIDObjMeta;
  uid: Uid;
  relationshipNames: FieldCampingImageRelationshipName[];
}

export enum Filemime {
  ImageJPEG = "image/jpeg",
}

export enum FieldCampingImageRelationshipName {
  NodeType = "node_type",
  RevisionUid = "revision_uid",
  Uid = "uid",
}

export interface FieldCampingImageResourceIDObjMeta {
  alt: Alt;
  title: string;
  width: number;
  height: number;
  drupal_internal__target_id: number;
}

export enum Alt {
  Test = "test",
}

export enum FieldCampingImageType {
  FileFile = "file--file",
}

export interface Uid {
  type: UidType;
  id: string;
  resourceIdObjMeta: FieldCampingCountryResourceIDObjMeta;
}

export enum UidType {
  UserUser = "user--user",
}

export interface URI {
  value: string;
  url: string;
}

export interface FieldCampingOwner {
  type: FieldCampingOwnerType;
  id: string;
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: Langcode;
  revision_timestamp: Date;
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
  field_owner_phone: FieldOwnerPhone;
  links: FieldCampingCountryLinks;
  resourceIdObjMeta: FieldCampingCountryResourceIDObjMeta;
  node_type: Vid;
  revision_uid: Uid;
  uid: Uid;
  relationshipNames: FieldCampingImageRelationshipName[];
}

export enum FieldOwnerPhone {
  The041111111111 = "0411 111 111 11",
  The0472385691 = "0472 38 56 91",
  The0496218730 = "0496 21 87 30",
}

export enum FieldCampingOwnerType {
  NodeOwner = "node--owner",
}

export interface FieldCampingTag {
  type: ParentType;
  id: string;
  drupal_internal__tid?: number;
  drupal_internal__revision_id?: number;
  langcode?: Langcode;
  revision_created?: Date;
  status?: boolean;
  name?: string;
  description?: null;
  weight?: number;
  changed?: Date;
  default_langcode?: boolean;
  revision_translation_affected?: boolean;
  path?: Path;
  links?: FieldCampingCountryLinks;
  resourceIdObjMeta: FieldCampingTagResourceIDObjMeta;
  vid?: Vid;
  revision_user?: null;
  parent?: Parent[];
  relationshipNames?: FieldCampingCountryRelationshipName[];
}

export interface FieldCampingTagResourceIDObjMeta {
  drupal_internal__target_id?: number;
  links?: ResourceIDObjMetaLinks;
}

export enum CampingRelationshipName {
  FieldCampingCountry = "field_camping_country",
  FieldCampingImage = "field_camping_image",
  FieldCampingLocation = "field_camping_location",
  FieldCampingOwner = "field_camping_owner",
  FieldCampingTags = "field_camping_tags",
}

export enum CampingType {
  NodeCamping = "node--camping",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toCamping(json: string): Camping[] {
    return cast(JSON.parse(json), a(r("Camping")));
  }

  public static campingToJson(value: Camping[]): string {
    return JSON.stringify(uncast(value, a(r("Camping"))), null, 2);
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
      { json: "type", js: "type", typ: r("CampingType") },
      { json: "id", js: "id", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "field_camping_description", js: "field_camping_description", typ: "" },
      { json: "field_camping_price", js: "field_camping_price", typ: "" },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
      { json: "field_camping_country", js: "field_camping_country", typ: r("FieldCamping") },
      { json: "field_camping_image", js: "field_camping_image", typ: r("FieldCampingImage") },
      { json: "field_camping_location", js: "field_camping_location", typ: r("FieldCamping") },
      { json: "field_camping_owner", js: "field_camping_owner", typ: r("FieldCampingOwner") },
      { json: "field_camping_tags", js: "field_camping_tags", typ: a(r("FieldCampingTag")) },
      { json: "relationshipNames", js: "relationshipNames", typ: a(r("CampingRelationshipName")) },
    ],
    false
  ),
  FieldCamping: o(
    [
      { json: "type", js: "type", typ: r("ParentType") },
      { json: "id", js: "id", typ: "" },
      { json: "drupal_internal__tid", js: "drupal_internal__tid", typ: 0 },
      { json: "drupal_internal__revision_id", js: "drupal_internal__revision_id", typ: 0 },
      { json: "langcode", js: "langcode", typ: r("Langcode") },
      { json: "revision_created", js: "revision_created", typ: Date },
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
      { json: "relationshipNames", js: "relationshipNames", typ: a(r("FieldCampingCountryRelationshipName")) },
    ],
    false
  ),
  FieldCampingCountryLinks: o([{ json: "self", js: "self", typ: r("Self") }], false),
  Self: o([{ json: "href", js: "href", typ: "" }], false),
  Parent: o(
    [
      { json: "type", js: "type", typ: r("ParentType") },
      { json: "id", js: "id", typ: r("ID") },
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
  Meta: o([{ json: "about", js: "about", typ: r("About") }], false),
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
      { json: "type", js: "type", typ: r("VidType") },
      { json: "id", js: "id", typ: "" },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("VidResourceIDObjMeta") },
    ],
    false
  ),
  VidResourceIDObjMeta: o([{ json: "drupal_internal__target_id", js: "drupal_internal__target_id", typ: r("DrupalInternalTargetID") }], false),
  FieldCampingImage: o(
    [
      { json: "type", js: "type", typ: r("FieldCampingImageType") },
      { json: "id", js: "id", typ: "" },
      { json: "drupal_internal__fid", js: "drupal_internal__fid", typ: 0 },
      { json: "langcode", js: "langcode", typ: r("Langcode") },
      { json: "filename", js: "filename", typ: "" },
      { json: "uri", js: "uri", typ: r("URI") },
      { json: "filemime", js: "filemime", typ: r("Filemime") },
      { json: "filesize", js: "filesize", typ: 0 },
      { json: "status", js: "status", typ: true },
      { json: "created", js: "created", typ: Date },
      { json: "changed", js: "changed", typ: Date },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("FieldCampingImageResourceIDObjMeta") },
      { json: "uid", js: "uid", typ: r("Uid") },
      { json: "relationshipNames", js: "relationshipNames", typ: a(r("FieldCampingImageRelationshipName")) },
    ],
    false
  ),
  FieldCampingImageResourceIDObjMeta: o(
    [
      { json: "alt", js: "alt", typ: r("Alt") },
      { json: "title", js: "title", typ: "" },
      { json: "width", js: "width", typ: 0 },
      { json: "height", js: "height", typ: 0 },
      { json: "drupal_internal__target_id", js: "drupal_internal__target_id", typ: 0 },
    ],
    false
  ),
  Uid: o(
    [
      { json: "type", js: "type", typ: r("UidType") },
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
  FieldCampingOwner: o(
    [
      { json: "type", js: "type", typ: r("FieldCampingOwnerType") },
      { json: "id", js: "id", typ: "" },
      { json: "drupal_internal__nid", js: "drupal_internal__nid", typ: 0 },
      { json: "drupal_internal__vid", js: "drupal_internal__vid", typ: 0 },
      { json: "langcode", js: "langcode", typ: r("Langcode") },
      { json: "revision_timestamp", js: "revision_timestamp", typ: Date },
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
      { json: "field_owner_phone", js: "field_owner_phone", typ: r("FieldOwnerPhone") },
      { json: "links", js: "links", typ: r("FieldCampingCountryLinks") },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("FieldCampingCountryResourceIDObjMeta") },
      { json: "node_type", js: "node_type", typ: r("Vid") },
      { json: "revision_uid", js: "revision_uid", typ: r("Uid") },
      { json: "uid", js: "uid", typ: r("Uid") },
      { json: "relationshipNames", js: "relationshipNames", typ: a(r("FieldCampingImageRelationshipName")) },
    ],
    false
  ),
  FieldCampingTag: o(
    [
      { json: "type", js: "type", typ: r("ParentType") },
      { json: "id", js: "id", typ: "" },
      { json: "drupal_internal__tid", js: "drupal_internal__tid", typ: u(undefined, 0) },
      { json: "drupal_internal__revision_id", js: "drupal_internal__revision_id", typ: u(undefined, 0) },
      { json: "langcode", js: "langcode", typ: u(undefined, r("Langcode")) },
      { json: "revision_created", js: "revision_created", typ: u(undefined, Date) },
      { json: "status", js: "status", typ: u(undefined, true) },
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "description", js: "description", typ: u(undefined, null) },
      { json: "weight", js: "weight", typ: u(undefined, 0) },
      { json: "changed", js: "changed", typ: u(undefined, Date) },
      { json: "default_langcode", js: "default_langcode", typ: u(undefined, true) },
      { json: "revision_translation_affected", js: "revision_translation_affected", typ: u(undefined, true) },
      { json: "path", js: "path", typ: u(undefined, r("Path")) },
      { json: "links", js: "links", typ: u(undefined, r("FieldCampingCountryLinks")) },
      { json: "resourceIdObjMeta", js: "resourceIdObjMeta", typ: r("FieldCampingTagResourceIDObjMeta") },
      { json: "vid", js: "vid", typ: u(undefined, r("Vid")) },
      { json: "revision_user", js: "revision_user", typ: u(undefined, null) },
      { json: "parent", js: "parent", typ: u(undefined, a(r("Parent"))) },
      { json: "relationshipNames", js: "relationshipNames", typ: u(undefined, a(r("FieldCampingCountryRelationshipName"))) },
    ],
    false
  ),
  FieldCampingTagResourceIDObjMeta: o(
    [
      { json: "drupal_internal__target_id", js: "drupal_internal__target_id", typ: u(undefined, 0) },
      { json: "links", js: "links", typ: u(undefined, r("ResourceIDObjMetaLinks")) },
    ],
    false
  ),
  Langcode: ["en"],
  ID: ["virtual"],
  About: ["Usage and meaning of the 'missing' resource identifier.", "Usage and meaning of the 'virtual' resource identifier."],
  ParentType: ["taxonomy_term--categories_camping", "taxonomy_term--cities_belgium", "taxonomy_term--countries"],
  FieldCampingCountryRelationshipName: ["parent", "revision_user", "vid"],
  DrupalInternalTargetID: ["categories_camping", "cities_belgium", "countries", "owner"],
  VidType: ["node_type--node_type", "taxonomy_vocabulary--taxonomy_vocabulary"],
  Filemime: ["image/jpeg"],
  FieldCampingImageRelationshipName: ["node_type", "revision_uid", "uid"],
  Alt: ["test"],
  FieldCampingImageType: ["file--file"],
  UidType: ["user--user"],
  FieldOwnerPhone: ["0411 111 111 11", "0472 38 56 91", "0496 21 87 30"],
  FieldCampingOwnerType: ["node--owner"],
  CampingRelationshipName: ["field_camping_country", "field_camping_image", "field_camping_location", "field_camping_owner", "field_camping_tags"],
  CampingType: ["node--camping"],
};
