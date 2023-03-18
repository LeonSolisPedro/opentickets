const redirects = (to, from, next) => {

  //We are redirecting to corresponding dashboards
  const lastComponents1 = Object.values(to.matched[to.matched?.length - 1]?.components ?? {});
  const redirectdashboards = lastComponents1.some(x => x.RedirectToDashboards)
  if (redirectdashboards) {
    const coolurl = to.path.replace(/\/$/, "");

    next({ path: `${coolurl}/tickets`, replace: true })
  }

  
  //We are redirecting to index (if possible)
  const lastComponents2 = Object.values(to.matched[to.matched?.length - 1]?.components ?? {});
  const redirectindex = lastComponents2.some(x => x.RedirectToIndex)
  if (redirectindex) {
    const coolurl = to.path.replace(/\/$/, "");
    next({ path: `${coolurl}/index`, replace: true })
  }

}


export default redirects