export const defaultPayload = { field_names: "[]", input: "{}", url: "string" };

export function JSONPayload({ field_names, input, url }) {
  this.field_names = field_names;
  if (!field_names) {
    this.field_names = "[]";
  }

  this.input = input;
  if (!input) {
    this.input = "{}";
  }

  this.url = url;
  if (!url) {
    this.url = "string";
  }

  this.getPayload = () => {
    return {
      field_names: JSON.parse(this.field_names),
      input: JSON.parse(this.input),
      url: this.url,
    };
  };
}
