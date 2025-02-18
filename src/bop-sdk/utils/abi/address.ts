"use strict";

import { BytesLike } from "./bytes";
import { BigNumberish } from "./bignumber";

import { Logger } from "../logger";

import * as cryptoJs from "crypto-js";
import * as bs58 from "@bifproject/bs58";

const version = "address/5.7.0";
const logger = new Logger(version);

function remove0xPrefix(str: string): string {
  if (str.startsWith("0x")) {
    return str.substring(2);
  }
  return str;
}

function isHexadecimalString(str: string): boolean {
  const hexRegex = /^[0-9a-fA-F]+$/;
  return hexRegex.test(remove0xPrefix(str));
}

function startsWithDidBid(identifier: string): boolean {
  const regex = /^(did:bid:ef|did:bid:zf)/;
  return regex.test(identifier);
}

function hexAddressToDid(address: string): string {
  if (startsWithDidBid(address)) {
    return address;
  } else {
    if (!isHexadecimalString(address)) {
      return "";
    }
    // 去除0x前缀（如果存在）
    let addressWithout0x = remove0xPrefix(address);
    // 截取前两个字节
    const prefixBytes = addressWithout0x.slice(0, 4);
    let prefix;
    if (prefixBytes === "6566") {
      prefix = "ef";
    } else if (prefixBytes === "7a66") {
      prefix = "zf";
    } else {
      return "";
    }
    // 对剩余数据进行Base58编码
    const dataToEncode = addressWithout0x.slice(4);
    const base58Encoded = bs58.encode(Buffer.from(dataToEncode, "hex"));
    // 拼接并返回最终的地址字符串
    const result = `did:bid:${prefix}${base58Encoded}`;
    return result;
  }
}

export function getAddress(address: string): string {
  const ad = hexAddressToDid(address);
  logger.debug(`getAddress before:${address}, after:${ad}`);
  return ad;
}

function hexStringToByteArray(hexString: string): Array<number> {
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }

  const byteArray: Array<number> = [];
  for (let i = 0; i < hexString.length; i += 2) {
    // 解析每两个十六进制字符为一个字节
    const byteString = hexString.substr(i, 2);
    const byte = parseInt(byteString, 16); // 将十六进制字符串解析为十进制整数
    byteArray.push(byte);
  }

  return byteArray;
}

export function getContractAddress(transaction: {
  from: string;
  nonce: BigNumberish;
}): string {
  const srcAddress = transaction.from;
  let raw = "";
  raw += srcAddress;
  raw += "-";
  raw += Number(transaction.nonce).toString();
  raw += "-";
  raw += Number(0).toString();
  raw += "-";
  raw += Number(0).toString();

  const sha256Hash = cryptoJs.SHA256(raw);
  const hashStr = sha256Hash.toString(cryptoJs.enc.Hex);
  const address = bs58.encode(hexStringToByteArray(hashStr).slice(10));

  return `did:bid:ef${address}`;
}

export function getCreate2Address(
  from: string,
  salt: BytesLike,
  initCodeHash: BytesLike,
): string {
  //not support
  return "0x000000000000000000000000000000000000000000000000";
}
