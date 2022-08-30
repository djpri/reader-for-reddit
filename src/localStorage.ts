export const addSubToLocalStorage = (sub: string) => {
  const subs: string[] = JSON.parse(localStorage.getItem("savedSubreddits"));
  if (subs !== null && subs.length > 0) {
    subs.push(sub);
  }
  localStorage.setItem("savedSubreddits", JSON.stringify(subs));
};

export const removeSubFromLocalStorage = (sub: string) => {
  const subs: string[] = JSON.parse(localStorage.getItem("savedSubreddits"));
  if (subs !== null && subs.length > 0) {
    subs.splice(subs.indexOf(sub), 1);
  }
  localStorage.setItem("savedSubreddits", JSON.stringify(subs));
};

export const isSavedInStorage = (sub: string) => {
  const subs: string[] = JSON.parse(localStorage.getItem("savedSubreddits"));
  if (subs !== null && subs.length > 0) {
    return subs.includes(sub);
  } else {
    return false;
  }
};

export const getSubsFromLocalStorage = () => {
  if (localStorage?.getItem("savedSubreddits") !== null) {
    return JSON.parse(localStorage.getItem("savedSubreddits"));
  } else {
    return [];
  }
};
