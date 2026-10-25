import { describe, expect, it } from "vitest";
import { validateProvenanceGraph } from "../src/domain/engine.js";
describe("provenance validation", () => {
  it("accepts a complete acyclic artifact chain", () => { expect(validateProvenanceGraph([{id:"data",parentIds:[]},{id:"analysis",parentIds:["data"]}])).toEqual([]); });
  it("reports missing parents and cycles", () => { const issues=validateProvenanceGraph([{id:"a",parentIds:["b","missing"]},{id:"b",parentIds:["a"]}]); expect(issues).toContain("missing:a->missing"); expect(issues.some(x=>x.startsWith("cycle:"))).toBe(true); });
});