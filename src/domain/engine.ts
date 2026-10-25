export interface ProvenanceNode { id: string; parentIds: string[] }
export function validateProvenanceGraph(nodes: readonly ProvenanceNode[]): string[] {
  const issues: string[] = [];
  const byId = new Map<string, ProvenanceNode>();
  for (const node of nodes) {
    if (byId.has(node.id)) issues.push("duplicate:" + node.id);
    else byId.set(node.id, node);
  }
  for (const node of nodes) for (const parent of node.parentIds) if (!byId.has(parent)) issues.push("missing:" + node.id + "->" + parent);
  const state = new Map<string, number>();
  const visit = (id: string): void => {
    const current = state.get(id) ?? 0;
    if (current === 1) { issues.push("cycle:" + id); return; }
    if (current === 2) return;
    state.set(id, 1);
    const node = byId.get(id);
    if (node) for (const parent of node.parentIds) if (byId.has(parent)) visit(parent);
    state.set(id, 2);
  };
  for (const id of byId.keys()) visit(id);
  return [...new Set(issues)].sort();
}