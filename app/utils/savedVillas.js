"use client";

const SAVED_VILLAS_KEY = "staycation_saved_villas";

export function getSavedVillas() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(SAVED_VILLAS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading saved villas:", e);
    return [];
  }
}

export function isVillaSaved(slug) {
  const saved = getSavedVillas();
  return saved.includes(slug);
}

export function toggleSaveVilla(slug) {
  if (typeof window === "undefined") return false;
  const saved = getSavedVillas();
  let updated;
  let isSaved = false;

  if (saved.includes(slug)) {
    updated = saved.filter((s) => s !== slug);
  } else {
    updated = [...saved, slug];
    isSaved = true;
  }

  try {
    localStorage.setItem(SAVED_VILLAS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("savedVillasChanged"));
  } catch (e) {
    console.error("Error updating saved villas:", e);
  }

  return isSaved;
}
