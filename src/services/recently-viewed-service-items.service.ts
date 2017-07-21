import * as _ from 'lodash';

export class RecentlyViewedServiceItems {

  static $inject = ['$rootScope'];
  private $rootScope: any;

  constructor ($rootScope: any) {
    this.$rootScope = $rootScope;
  }

  public getItems() {
    let recentlyViewed: any = localStorage.getItem('catalog-recently-viewed-services');
    return recentlyViewed ? JSON.parse(recentlyViewed) : [];
  }

  public addItem(uid: any) {
    let recentlyViewed: any = this.getItems();

    // if previously viewed, remove from list
    _.remove(recentlyViewed, (rvUID) => {
      return rvUID === uid;
    });

    // add to front of list
    recentlyViewed.unshift(uid);

    // limit to 4 items
    recentlyViewed = _.take(recentlyViewed, 4);

    this.setRecentlyViewedItems(recentlyViewed);
  }

  private setRecentlyViewedItems(recentlyViewed: any) {
    localStorage.setItem('catalog-recently-viewed-services', JSON.stringify(recentlyViewed));
    this.$rootScope.$emit('recently-viewed-updated');
  }
}
