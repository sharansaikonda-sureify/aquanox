import { v4 as uuidv4 } from "uuid";

export function SureifyObjectMapping({
  data_type,
  extra,
  field_source,
  formatter,
  post_op_config,
  mapping_id,
  parent_idx,
  sureify_field_id,
  sureify_field_name,
  txn_key,
  txn_source,
}) {
  this.data_type = data_type;

  this.mapping_id = mapping_id;
  if (isNaN(mapping_id) === false) {
    this.mapping_id = parseInt(this.mapping_id);
  }

  this.parent_idx = parent_idx;
  if (isNaN(parent_idx) === false) {
    this.parent_idx = parseInt(this.parent_idx);
  }

  this.sureify_field_id = sureify_field_id;
  this.sureify_field_name = sureify_field_name;
  this.txn_key = txn_key;
  this.txn_source = txn_source;
  this.unique_id = uuidv4();

  this.field_source = field_source;

  this.extra = extra;
  if (!extra) {
    this.extra = "{}";
  } else if (typeof extra == "object") {
    this.extra = JSON.stringify(extra);
  }

  this.post_op_config = post_op_config;
  if (!post_op_config) {
    this.post_op_config = "{}";
  } else if (typeof post_op_config == "object") {
    this.post_op_config = JSON.stringify(post_op_config);
  }

  this.formatter = formatter;
  if (!formatter) {
    this.formatter = "{}";
  } else if (typeof formatter == "object") {
    this.formatter = JSON.stringify(formatter);
  }

  this.getPatchMappings = (cdsId) => {
    return {
      client_data_source_id: +cdsId,
      mappings: [
        {
          action: "PATCH",
          data_type: this.data_type,
          field_source: this.field_source,
          extra: JSON.parse(this.extra),
          post_op_config: this.post_op_config,
          formatter: this.formatter,
          mapping_id: this.mapping_id,
          parent_idx: this.parent_idx,
          sureify_field_name: this.sureify_field_name,
          txn_key: this.txn_key,
          txn_source: this.txn_source,
        },
      ],
    };
  };

  this.getPostMappings = (cdsId) => {
    return {
      client_data_source_id: +cdsId,
      mappings: [
        {
          action: "POST",
          data_type: this.data_type,
          field_source: this.field_source,
          extra: JSON.parse(this.extra),
          post_op_config: this.post_op_config,
          formatter: this.formatter,
          mapping_id: this.mapping_id,
          parent_idx: this.parent_idx,
          sureify_field_name: this.sureify_field_name,
          txn_key: this.txn_key,
          txn_source: this.txn_source,
        },
      ],
    };
  };

  this.getPostMappingOnly = () => {
    return {
      action: "POST",
      data_type: this.data_type,
      field_source: this.field_source,
      extra: JSON.parse(this.extra),
      post_op_config: this.post_op_config,
      formatter: this.formatter,
      mapping_id: this.mapping_id,
      parent_idx: this.parent_idx,
      sureify_field_name: this.sureify_field_name,
      txn_key: this.txn_key,
      txn_source: this.txn_source,
    };
  };

  this.getDeleteMappings = (cdsId) => {
    return {
      client_data_source_id: +cdsId,
      mappings: [
        {
          action: "DELETE",
          mapping_id: this.mapping_id,
        },
      ],
    };
  };
}
