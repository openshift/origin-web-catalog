interface IRecentlyViewedProjectsService {
  orderByMostRecentlyViewed(projects: any): any;
}

export class RecentlyViewedProjectsService implements IRecentlyViewedProjectsService {
  public orderByMostRecentlyViewed(projects: any) {
    return projects;
  }
  public isRecentlyViewed(uid: string) {
    return uid === '40f7a2df-0e78-11e7-ad0b-080027242396' ? true : false;
  }
}


