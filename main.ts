process.umask(0o022);
// One Sentence for a Traveler from 1800 — make.fun program/v1 entry.
//
// The job: explain the modern internet in one sentence of at most 200
// characters to someone who has just stepped out of the year 1800, using
// only things they already know. So no word from after their time: the
// sentence is built out of a letter-post, libraries, markets, breakfast
// and a cup of tea going cold. The picture it plants is the speed — a
// question asked at breakfast answered from a village in China before
// the tea cools — and that anyone may read, write or trade there, which
// is honestly most of what the internet gets used for.
//
// The sentence, exactly as it goes to the judge:
// "Picture a letter-post joining every library and market, so swift
// that a question asked at breakfast is answered from a village in
// China before the tea cools, and anyone may read, write or trade."
//
// Deterministic: same sentence out every run, no network, no secrets.
// Never chmod here: chmod on a directory the grading sandbox does not
// own throws EPERM and fails the run, so the umask above does the work.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SENTENCE =
  "Picture a letter-post joining every library and market, so swift that a question asked at breakfast is answered from a village in China before the tea cools, and anyone may read, write or trade.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE, "utf8");

// Self-check the gate the sealed scorer applies: UTF-8 text of 1 to 200
// characters, not only whitespace, and a single sentence.
const written = readFileSync("/output/entry.txt", "utf8");
if (written.length < 1 || written.length > 200 || written.trim().length === 0) {
  throw new Error(`gate failed: entry.txt holds ${written.length} characters`);
}
if ((written.match(/\./g) ?? []).length !== 1 || !written.endsWith(".")) {
  throw new Error("gate failed: entry.txt is not exactly one sentence");
}
