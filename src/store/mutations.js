export function setMissionaries (state, value) {
  const tmp = []
  value.forEach(m => tmp.push({ value: m.id, label: m.name }))
  state.missionaries = tmp
}
