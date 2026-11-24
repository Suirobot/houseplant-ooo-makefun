// The Houseplant Out-of-Office — entrypoint.
// Writes the funniest out-of-office auto-reply a houseplant would
// send (at most 120 characters) to /output/entry.txt.
// Competition: u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047
// (make.fun, account @bangjacky). The reply is assembled from
// beats below, so the status and the escalation policy stay apart.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";

// The auto-reply, beat by beat: the status line first,
// then what counts as urgent in a plant's world.
const PARTS = [
  "Out of office: photosynthesizing.",
  "Replies resume after watering. Maybe.",
  "Urgent matters: I am a fern; there are none.",
];
const LINE = PARTS.join(" ");

// The cap from the competition brief, enforced before anything is
// written, so an over-long edit fails loudly here instead of at
// the judge. The gate counts characters of UTF-8 text, so the byte
// length is checked too: a line of multibyte characters could pass
// on chars and still be the wrong size on the wire.
const CAP = 120;
if (LINE.length < 1 || LINE.length > CAP) {
  throw new Error(`entry is ${LINE.length} chars; cap is ${CAP}`);
}
if (Buffer.byteLength(LINE, "utf8") > CAP) {
  throw new Error(`entry is ${Buffer.byteLength(LINE, "utf8")} bytes; cap is ${CAP}`);
}

function main(): void {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  console.log(`wrote ${LINE.length} chars to ${OUT}`);
}

main();
