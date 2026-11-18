import { describe, expect, it } from "vitest";
import { parseMailboxes, sameAddress, singleMailbox } from "../../src/lib/mailbox/address";

/**
 * Reading a From header: exactly one mailbox, or nothing.
 *
 * The cases that matter most are the ones where a display name, a comment or
 * a second address tries to pass for the sender. Each must either resolve to
 * the address the header really carries or not resolve at all.
 */

describe("singleMailbox", () => {
  it.each([
    ["ivan@example.bg", { name: null, address: "ivan@example.bg" }],
    ["<ivan@example.bg>", { name: null, address: "ivan@example.bg" }],
    ["Иван Иванов <ivan@example.bg>", { name: "Иван Иванов", address: "ivan@example.bg" }],
    ['"Doe, John" <john@example.com>', { name: "Doe, John", address: "john@example.com" }],
    ['John "Q" Public <q@example.com>', { name: "John Q Public", address: "q@example.com" }],
    ["john@example.com (John Doe)", { name: null, address: "john@example.com" }],
    [
      "Markus <Markus.Weber+anfrage@Kantine-Weber.DE>",
      { name: "Markus", address: "markus.weber+anfrage@kantine-weber.de" },
    ],
    ["=?UTF-8?B?0JjQstCw0L0=?= <ivan@example.bg>", { name: "=?UTF-8?B?0JjQstCw0L0=?=", address: "ivan@example.bg" }],
    ["  Name   <  a@b.example  >  ", { name: "Name", address: "a@b.example" }],
  ])("reads %s", (header, expected) => {
    expect(singleMailbox(header)).toEqual(expected);
  });

  it("is not fooled by an address inside a quoted display name", () => {
    expect(singleMailbox('"<Victim@Example.com>" <attacker@evil.example>')).toEqual({
      name: "<Victim@Example.com>",
      address: "attacker@evil.example",
    });
    expect(singleMailbox('"victim@example.com" <attacker@evil.example>')?.address).toBe("attacker@evil.example");
    /* Escaped quotes do not end the quoted string early. */
    expect(singleMailbox('"a\\" <victim@example.com> \\"" <attacker@evil.example>')?.address).toBe(
      "attacker@evil.example",
    );
  });

  it("is not fooled by an address inside a comment", () => {
    expect(singleMailbox("(victim@example.com) attacker@evil.example")?.address).toBe("attacker@evil.example");
    expect(singleMailbox("attacker@evil.example (<victim@example.com>)")?.address).toBe("attacker@evil.example");
    expect(singleMailbox("Name (nested (<victim@example.com>) comment) <attacker@evil.example>")?.address).toBe(
      "attacker@evil.example",
    );
  });

  it.each([
    ["two mailboxes", "victim@example.com, attacker@evil.example"],
    ["two named mailboxes", "Victim <victim@example.com>, Attacker <attacker@evil.example>"],
    ["two angle-addresses", "Victim <victim@example.com> <attacker@evil.example>"],
    ["a group", "team: victim@example.com, attacker@evil.example;"],
    ["an empty group", "undisclosed-recipients:;"],
    ["an unquoted @ in the name", "victim@example.com <attacker@evil.example>"],
    ["an unterminated quote", '"victim@example.com <attacker@evil.example>'],
    ["an unterminated comment", "(victim@example.com attacker@evil.example"],
    ["an unterminated angle-address", "Name <attacker@evil.example"],
    ["a stray closer", "victim@example.com> attacker@evil.example"],
    ["text after the address", "<attacker@evil.example> victim@example.com"],
    ["no address", "Just A Name"],
    ["an empty header", ""],
    ["no domain dot", "root@localhost"],
    ["a quoted local part", '"john smith"@example.com'],
    ["an address literal", "john@[192.0.2.1]"],
    ["a header line break", "Name <a@example.com>\r\nBcc: b@example.com"],
    ["a nested angle bracket", "Name <<victim@example.com>>"],
  ])("refuses %s", (_, header) => {
    expect(singleMailbox(header)).toBeNull();
  });

  it("refuses what is not a string, or too long to be honest", () => {
    expect(singleMailbox(null)).toBeNull();
    expect(singleMailbox(undefined)).toBeNull();
    expect(singleMailbox(`${"a".repeat(3000)}@example.com`)).toBeNull();
  });
});

describe("parseMailboxes", () => {
  it("reads a list, tolerating empty elements, and refuses one bad member", () => {
    expect(parseMailboxes("a@x.example, B <b@y.example>,,")?.map((m) => m.address)).toEqual([
      "a@x.example",
      "b@y.example",
    ]);
    expect(parseMailboxes("a@x.example, not an address")).toBeNull();
    expect(parseMailboxes("")).toEqual([]);
  });
});

describe("sameAddress", () => {
  it("compares addresses as the lowercase keys they are stored as", () => {
    expect(sameAddress("Victim@Example.COM", " victim@example.com")).toBe(true);
    expect(sameAddress("victim@example.com", "victim@example.co")).toBe(false);
  });
});
