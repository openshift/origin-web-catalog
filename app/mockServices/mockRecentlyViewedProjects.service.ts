interface IRecentlyViewedProjectsService {
  orderByMostRecentlyViewed(projects: any): any;
}

export class RecentlyViewedProjectsService implements IRecentlyViewedProjectsService {
  public orderByMostRecentlyViewed(projects: any) {
    return projects;
  }
}


