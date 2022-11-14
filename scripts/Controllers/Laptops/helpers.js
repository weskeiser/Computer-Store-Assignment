export const toggleSelected = (selected, ...els) => {
  els.forEach((el) => {
    if (selected) {
      el.setAttribute("selected", "true");
    } else {
      el.setAttribute("selected", "false");
    }
  });
  //
  // selected
  //   ? el.setAttribute("data-laptop", "selected")
  //   : el.removeAttribute("data-laptop", "selected");
};
