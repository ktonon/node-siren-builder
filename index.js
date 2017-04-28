'use strict';

/**
 * A fluent Siren hypermedia representation builder.
 * @module SirenBuilder
 */

const METHOD = new Set(['GET', 'PUT', 'POST', 'DELETE', 'PATCH']);
const METHOD_LIST = Array.from(METHOD).join(', ');

function normalizeRel(rel) {
  if (!Array.isArray(rel)) {
    return [rel.hypermediaRel || rel];
  } else {
    return rel;
  }
}

/**
 * Siren link builder.
 */
class SirenLink {

  /**
   * Constructs a new Siren link builder.
   */
  constructor() {
    this._rel = undefined;
    this._class = undefined;
    this._href = undefined;
    this._title = undefined;
    this._type = undefined;
  }

  /**
   * Sets the rel.
   * @param {(String|String[])} rel
   * @return {SirenLink}
   */
  setRel(rel) {
    this._rel = normalizeRel(rel);
    return this;
  }

  /**
   * Adds a class.
   * @param {String} className
   * @return {SirenLink}
   */
  addClass(className) {
    if (this._class == null) {
      this._class = [];
    }
    this._class.push(className);
    return this;
  }

  /**
   * Sets the href.
   * @param {String} href
   * @return {SirenLink}
   */
  setHref(href) {
    this._href = href;
    return this;
  }

  /**
   * Sets the title.
   * @param {String} title
   * @return {SirenLink}
   */
  setTitle(title) {
    this._title = title;
    return this;
  }

  /**
   * Sets the type.
   * @param {String} type
   * @return {SirenLink}
   */
  setType(type) {
    this._type = type;
    return this;
  }

  /**
   * Constructs a shallow copy.
   * @return {SirenLink}
   */
  copy() {
    const copy = new SirenLink();
    copy._rel = this._rel;
    copy._class = this._class;
    copy._href = this._href;
    copy._title = this._title;
    copy._type = this._type;
    return copy;
  }

  /**
   * Constructs a deep copy.
   * @return {SirenLink}
   */
  clone() {
    const clone = new SirenLink();
    if (this._rel != null) {
      clone._rel = this._rel.slice();
    }
    if (this._class != null) {
      clone._class = this._class.slice();
    }
    if (this._href != null) {
      clone._href = this._href;
    }
    if (this._title != null) {
      clone._title = this._title;
    }
    if (this._type != null) {
      clone._type = this._type;
    }
    return clone;
  }

  /**
   * Builds the Siren link.
   * @return {object}
   */
  toJSON() {
    const json = {};
    if (this._rel != null) {
      json.rel = this._rel;
    } else {
      throw new Error('link MUST have a rel');
    }
    if (this._class != null) {
      json.class = this._class;
    }
    if (this._href != null) {
      json.href = this._href;
    } else {
      throw new Error('link MUST have an href');
    }
    if (this._title != null) {
      json.title = this._title;
    }
    if (this._type != null) {
      json.type = this._type;
    }
    return json;
  }

  /**
   * Constructs an empty Siren link builder.
   * @return {SirenLink}
   * @alias module:SirenBuilder.link
   */
  static create() {
    return new SirenLink();
  }

}

/**
 * Siren field builder.
 */
class SirenField {

  /**
   * Constructs a new Siren field builder.
   */
  constructor() {
    this._name = undefined;
    this._class = undefined;
    this._type = undefined;
    this._value = undefined;
    this._title = undefined;
  }

  /**
   * Sets the name.
   * @param {String} name
   * @return {SirenField}
   */
  setName(name) {
    this._name = name;
    return this;
  }

  /**
   * Adds a class.
   * @param {String} className
   * @return {SirenField}
   */
  addClass(className) {
    if (this._class == null) {
      this._class = [];
    }
    this._class.push(className);
    return this;
  }

  /**
   * Sets the type.
   * @param {String} type
   * @return {SirenField}
   */
  setType(type) {
    this._type = type;
    return this;
  }

  /**
   * Sets the value.
   * @param {Any} value
   * @return {SirenField}
   */
  setValue(value) {
    this._value = value;
    return this;
  }


  /**
   * Sets the title.
   * @param {String} title
   * @return {SirenField}
   */
  setTitle(title) {
    this._title = title;
    return this;
  }

  /**
   * Constructs a shallow copy.
   * @return {SirenField}
   */
  copy() {
    const copy = new SirenField();
    copy._name = this._name;
    copy._class = this._class;
    copy._type = this._type;
    copy._value = this._value;
    copy._title = this._title;
    return copy;
  }

  /**
   * Constructs a deep copy.
   * @return {SirenField}
   */
  clone() {
    const clone = new SirenField();
    if (this._name != null) {
      clone._name = this._name;
    }
    if (this._class != null) {
      clone._class = this._class.slice();
    }
    if (this._type != null) {
      clone._type = this._type;
    }
    if (this._value != null) {
      clone._value = this._value;
    }
    if (this._title != null) {
      clone._title = this._title;
    }
    return clone;
  }

  /**
   * Builds the Siren field.
   * @return {object}
   */
  toJSON() {
    const json = {};
    if (this._name != null) {
      json.name = this._name;
    } else {
      throw new Error('field MUST have a name');
    }
    if (this._class != null) {
      json.class = this._class;
    }
    if (this._type != null) {
      json.type = this._type;
    }
    if (this._value != null) {
      json.value = this._value;
    }
    if (this._title != null) {
      json.title = this._title;
    }
    return json;
  }

  /**
   * Constructs an empty Siren field builder.
   * @return {SirenField}
   * @alias module:SirenBuilder.field
   */
  static create() {
    return new SirenField();
  }

}

/**
 * Siren action builder.
 */
class SirenAction {

  /**
   * Constructs a new Siren action builder.
   */
  constructor(delegate, params) {
    this._name = undefined;
    this._rel = undefined;
    this._class = undefined;
    this._method = undefined;
    this._href = undefined;
    this._title = undefined;
    this._type = undefined;
    this._fields = undefined;
    this._delegate = delegate;
    this._params = params;
  }

  get rel() { return this._rel; }
  get name() { return this._name; }

  /**
   * Sets the name.
   * @param {String} name
   * @return {SirenAction}
   */
  setName(name) {
    this._name = name;
    return this;
  }

  /**
   * Sets the rel.
   * @param {(String|String[])} rel
   * @return {SirenLink}
   */
  setRel(rel) {
    this._rel = rel;
    if (this._name === undefined && rel.hypermediaActionName) {
      this.setName(rel.hypermediaActionName);
    }
    if (rel.httpMethod) {
      this.setMethod(rel.httpMethod);
      this.setHref(this._delegate.resolveUrl(rel, this._params));
    }
    return this;
  }

  /**
   * Adds a class.
   * @param {String} className
   * @return {SirenAction}
   */
  addClass(className) {
    if (this._class == null) {
      this._class = [];
    }
    this._class.push(className);
    return this;
  }

  /**
   * Sets the method.
   * @param {String} method
   * @return {SirenAction}
   */
  setMethod(method) {
    if (!METHOD.has(method)) {
      throw new TypeError('methods MUST be one of ' + METHOD_LIST);
    }
    this._method = method;
    return this;
  }

  /**
   * Sets the href.
   * @param {String|relation.Type} href
   * @return {SirenLink}
   */
  setHref(href) {
    this._href = href.hypermediaRel ?
      this._delegate.resolveUrl(href, this._params, { method: this._method }) :
      href;
    return this;
  }

  /**
   * Sets the title.
   * @param {String} title
   * @return {SirenLink}
   */
  setTitle(title) {
    this._title = title;
    return this;
  }

  /**
   * Sets the type.
   * @param {String} type
   * @return {SirenAction}
   */
  setType(type) {
    this._type = type;
    return this;
  }

  /**
   * Adds a field.
   * @param {String} name
   * @param {(SirenField) => SirenField} defineField
   * @return {SirenAction}
   */
  addField(name, defineField) {
    if (this._fields == null) {
      this._fields = [];
    }
    for (let i = 0; i < this._fields.length; ++i) {
      if (this._fields[i]._name === name) {
        throw new Error('field name MUST be unique');
      }
    }
    const f = defineField(SirenField.create().setName(name));
    if (this._rel) {
      f.setValue(this._delegate.defaultFieldValue({
        fieldName: name,
        rel: this._rel,
        params: this._params,
      }));
    }
    this._fields.push(f);
    return this;
  }

  /**
   * Constructs a shallow copy.
   * @return {SirenAction}
   */
  copy() {
    const copy = new SirenAction();
    copy._name = this._name;
    copy._class = this._class;
    copy._method = this._method;
    copy._href = this._href;
    copy._title = this._title;
    copy._type = this._type;
    copy._fields = this._fields;
    return copy;
  }

  /**
   * Constructs a deep copy.
   * @return {SirenAction}
   */
  clone() {
    const clone = new SirenAction();
    if (this._name != null) {
      clone._name = this._name;
    }
    if (this._class != null) {
      clone._class = this._class.slice();
    }
    if (this._method != null) {
      clone._method = this._method;
    }
    if (this._href != null) {
      clone._href = this._href;
    }
    if (this._title != null) {
      clone._title = this._title;
    }
    if (this._type != null) {
      clone._type = this._type;
    }
    if (this._fields != null) {
      clone._fields = this._fields
        .map((field) => field.clone());
    }
    return clone;
  }

  /**
   * Builds the Siren action.
   * @return {object}
   */
  toJSON() {
    const json = {};
    if (this._name != null) {
      json.name = this._name;
    } else {
      throw new Error('action MUST have a name');
    }
    if (this._class != null) {
      json.class = this._class;
    }
    if (this._method != null) {
      json.method = this._method;
    }
    if (this._href != null) {
      json.href = this._href;
    } else {
      throw new Error('action MUST have an href');
    }
    if (this._title != null) {
      json.title = this._title;
    }
    if (this._type != null) {
      json.type = this._type;
    }
    if (this._fields != null) {
      json.fields = this._fields
        .map((field) => field.toJSON());
    }
    return json;
  }

  /**
   * Constructs an empty Siren action builder.
   * @return {SirenAction}
   * @alias module:SirenBuilder.action
   */
  static create(delegate, params) {
    return new SirenAction(delegate, params);
  }

}

/**
 * Siren entity builder.
 */
class SirenEntity {

  /**
   * Constructs a new Siren entity builder.
   */
  constructor(delegate, params) {
    this._class = undefined;
    this._rel = undefined;
    this._properties = undefined;
    this._entities = undefined;
    this._actions = undefined;
    this._links = undefined;
    this._delegate = delegate;
    this._params = params;
  }

  /**
   * Adds a class.
   * @param {String} className
   * @return {SirenEntity}
   */
  addClass(className) {
    if (this._class == null) {
      this._class = [];
    }
    this._class.push(className);
    return this;
  }

  /**
   * Sets the rel.
   * @param {(String|String[])} rel
   * @return {SirenEntity}
   */
  setRel(rel) {
    this._rel = normalizeRel(rel);
    return this;
  }

  /**
   * Adds a property key-value pair.
   * @param {String} key
   * @param {Any} value
   * @return {SirenEntity}
   */
  addProperty(key, value) {
    if (this._properties == null) {
      this._properties = {};
    }
    this._properties[key] = value;
    return this;
  }

  /**
   * Adds a property for each key/value pair in the given object.
   *
   * `Object.keys(obj)` is used to enumerate the keys.
   *
   * @param {object} obj
   * @return {SirenEntity}
   */
  addProperties(obj) {
    const keys = Object.keys(obj);
    let key;
    for (let i = 0; i < keys.length; ++i) {
      key = keys[i];
      this.addProperty(key, obj[key]);
    }
    return this;
  }

  /**
   * Adds an entity as either an embedded representation or link.
   * @param {(String|String[])} rel
   * @param {(SirenEntity|SirenLink)} entity
   * @return {SirenEntity}
   */
  addEntity(rel, entity) {
    if (this._entities == null) {
      this._entities = [];
    }
    this._entities.push(entity.copy().setRel(rel));
    return this;
  }

  /**
   * Adds a list of entities all with the same rel
   * @param {(String|String[])} rel
   * @param {(SirenEntity[]|SirenLink[])} entities
   * @return {SirenEntity}
   */
  addEntities(rel, entities) {
    if (this._entities == null) {
      this._entities = [];
    }
    const n = entities ? entities.length : 0;
    for (let i = 0; i < n; ++i) {
      this._entities.push(entities[i].copy().setRel(rel));
    }
    return this;
  }

  /**
   * Adds an action.
   * @param {(SirenAction) => SirenAction} defineAction
   * @return {SirenEntity}
   */
  * addAction(defineAction) {
    const action = defineAction(
      SirenAction.create(this._delegate, this._params));
    const rel = action.rel;
    const name = action.name;

    if (!(yield this._delegate.shouldAddAction(rel, this._params))) {
      return this;
    }
    if (this._actions == null) {
      this._actions = [];
    }
    for (let i = 0; i < this._actions.length; ++i) {
      if (this._actions[i]._name === name) {
        throw new Error('action name MUST be unique');
      }
    }
    this._actions.push(action);
    return this;
  }

  /**
   * Adds a link.
   * @param {relation.Type} rel
   * @option {String|null} alias
   * @param {object} opt forwarded to delegate methods
   * @return {SirenEntity}
   */
  * addLink(rel, opt = {}) {
    const alias = opt.alias;

    const params = opt.params ?
      opt.params(this._params) :
      this._params;

    if (!(yield this._delegate.shouldAddLink(rel, params, opt))) {
      return this;
    }
    if (this._links == null) {
      this._links = [];
    }
    const link = SirenLink.create()
      .setHref(this._delegate.resolveUrl(rel, params, opt));
    link.setRel(alias ? [alias, rel.hypermediaRel || rel] : rel);
    this._links.push(link);
    return this;
  }

  /**
   * Constructs a shallow copy.
   * @return {SirenEntity}
   */
  copy() {
    const copy = new SirenEntity();
    copy._class = this._class;
    copy._rel = this._rel;
    copy._properties = this._properties;
    copy._entities = this._entities;
    copy._actions = this._actions;
    copy._links = this._links;
    return copy;
  }

  /**
   * Constructs a deep copy.
   * @return {SirenEntity}
   */
  clone() {
    const clone = new SirenEntity();
    if (this._class != null) {
      clone._class = this._class.slice();
    }
    if (this._rel != null) {
      clone._rel = this._rel.slice();
    }
    if (this._properties != null) {
      clone._properties = Object.assign({}, this._properties);
    }
    if (this._entities != null) {
      clone._entities = this._entities
        .map((entity) => entity.clone());
    }
    if (this._actions != null) {
      clone._actions = this._actions
        .map((action) => action.clone());
    }
    if (this._links != null) {
      clone._links = this._links
        .map((link) => link.clone());
    }
    return clone;
  }

  /**
   * Builds the Siren entity.
   * @return {object}
   */
  toJSON() {
    const json = {};
    if (this._class != null) {
      json.class = this._class;
    }
    if (this._rel != null) {
      json.rel = this._rel;
    }
    if (this._properties != null) {
      json.properties = this._properties;
    }
    if (this._entities != null) {
      json.entities = this._entities
        .map((entity) => entity.toJSON());
    }
    if (this._actions != null) {
      json.actions = this._actions
        .map((action) => action.toJSON());
    }
    if (this._links != null) {
      json.links = this._links
        .map((link) => link.toJSON());
    }
    return json;
  }

  /**
   * Constructs an empty Siren entity builder.
   * @return {SirenEntity}
   * @alias module:SirenBuilder.entity
   */
  static create(delegate, params) {
    return new SirenEntity(delegate, params);
  }

}

module.exports = (nullableDelegate) => {
  const delegate = nullableDelegate || {};

  delegate.resolveUrl = delegate.resolveUrl ||
    ((type /* params, opt */) => type);
  delegate.shouldAddAction = delegate.shouldAddAction ||
    ((/* type, params, opt */) => true);
  delegate.shouldAddLink = delegate.shouldAddLink ||
    ((/* type, params, opt */) => true);

  return {
    action: (params) => SirenAction.create(delegate, params),
    entity: (params) => SirenEntity.create(delegate, params),
    field: SirenField.create,
    link: SirenLink.create,
  };
};
