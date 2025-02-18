const is = require("is-type-of");
const errors = require("../exception");
const proto = exports;

proto.SendOperation = function (args) {
  if (is.array(args) || !is.object(args) || JSON.stringify(args) === "{}") {
    return this._responseError(errors.REQUEST_NULL_ERROR);
  }

  const schema = {
    sourceAddress: {
      required: true,
      address: true,
    },
    destAddress: {
      required: true,
      address: true,
    },
    amount: {
      required: true,
      numeric: true,
    },
  };

  if (!this._validate(args, schema).tag) {
    const { msg } = this._validate(args, schema);
    return this._responseError(errors[msg]);
  }

  return this._responseData(true);
};

proto.GasSendRequestOperation = function (args) {
  if (is.array(args) || !is.object(args) || JSON.stringify(args) === "{}") {
    return this._responseError(errors.REQUEST_NULL_ERROR);
  }

  const schema = {
    senderAddress: {
      required: true,
      address: true,
    },
  };

  if (!this._validate(args, schema).tag) {
    const { msg } = this._validate(args, schema);
    return this._responseError(errors[msg]);
  }

  return this._responseData(true);
};
