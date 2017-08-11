import * as angular from 'angular';
import * as _ from 'lodash';

export class CatalogFilterController implements angular.IController {
  static $inject = ['$scope', 'Catalog'];

  public ctrl: any = this;
  private $scope: any;
  private Catalog: any;
  private removeClearFilterListener: any;

  constructor($scope: any, Catalog: any) {
    this.$scope = $scope;
    this.Catalog = Catalog;
  }

  public $onInit() {
    this.ctrl.filterPanelModel = [];
    this.ctrl.keywordFilter = {
        id: 'keyword',
        title:  'Keyword',
        placeholder: 'Filter by Keyword',
        filterType: 'text',
        values: []
      };
    this.ctrl.filterPanelModel.push(this.ctrl.keywordFilter);

    if (!_.isEmpty(this.Catalog.vendors)) {
      this.ctrl.VendorFilter = {
        id: 'vendors',
        title: 'Vendor',
        filterType: 'checkbox',
        values: _.map(this.Catalog.vendors, (vendor) => {
          return {
            id: vendor,
            title: vendor,
            value: vendor,
            selected: false
          };
        })
      };
      this.ctrl.filterPanelModel.push(this.ctrl.VendorFilter);
    }

    if (this.ctrl.filterOnKeyword) {
      this.ctrl.keywordFilter.values = [this.ctrl.filterOnKeyword];
      this.constructFiltersFromModel();
    }

    this.ctrl.config.onFilterChange = this.onFilterChange;

    this.removeClearFilterListener = this.$scope.$on('clear-filters', () => {
      this.resetFilterPanelModel();
      this.constructFiltersFromModel();
    });
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.filterOnKeyword  && onChangesObj.filterOnKeyword.currentValue) {
      this.resetFilterPanelModel();
      this.ctrl.keywordFilter.values = [this.ctrl.filterOnKeyword];
      this.constructFiltersFromModel();
    }
  }

  public $onDestroy() {
    this.removeClearFilterListener();
  }

  public onKeywordKeyPress = (keyEvent: any) => {
    if (keyEvent.which === 13 && this.ctrl.keywordFilter.value.length > 0) {
      // store new keywoard filter value in values array
      this.ctrl.keywordFilter.values.push(this.ctrl.keywordFilter.value);
      // remove the keyword value to show placeholder text
      delete this.ctrl.keywordFilter.value;
      this.constructFiltersFromModel();
    }
  };

  // called when filter is changed in the filter panel
  public filterChanged = () => {
    this.constructFiltersFromModel();
  };

  // called when filter cleared by hitting 'x' in filter results tag, or 'Clear All Filters' link
  private onFilterChange = (appliedFilters: any, changedFilterId: string, changedFilterValue: string) => {
    if (angular.isDefined(changedFilterId) && angular.isDefined(changedFilterValue)) {
      this.updateFilterPanelModel(changedFilterId, changedFilterValue);
    } else {
      this.resetFilterPanelModel();
    }
    this.constructFiltersFromModel();
  };

  private createAppliedFilter(filter: any, values: any) {
    return {
      id: filter.id,
      title: filter.title,
      filterType: filter.filterType,
      values: values
    };
  };

  private constructFiltersFromModel() {
    let newAppliedFilters = [];
    _.each(this.ctrl.filterPanelModel, (filter: any) => {
      if (!_.isEmpty(filter.values)) {
        if (filter.filterType === "checkbox") {
          let filterValues = [];
          // the values of the selected checkboxes are stored in a single new appliedFilter
          _.each(filter.values, (value: any) => {
            if (value.selected) {
              filterValues.push(value.value);
            }
          });
          if (!_.isEmpty(filterValues)) {
            newAppliedFilters.push( this.createAppliedFilter (filter, filterValues) );
          }
        } else {
          // each keyword value gets a new appliedFilter
          _.each(filter.values, (value: string) => {
            newAppliedFilters.push(this.createAppliedFilter(filter, [ value ]));
          });
        }
      }
    });

    // sets the filter result tags
    this.ctrl.config.appliedFilters = newAppliedFilters;

    // notify parent component of filter update
    if (this.ctrl.applyFilters) {
      this.ctrl.applyFilters({
        $event: {
          appliedFilters: this.ctrl.config.appliedFilters
        }
      });
    }
  };

  private updateFilterPanelModel(changedFilterId: string, changedFilterValue: string) {
    let changedFilter: any = _.find(this.ctrl.filterPanelModel, { id: changedFilterId });
    switch (changedFilter.filterType) {
      case "text":
        // remove keyword from values array
        _.remove(changedFilter.values, function(v: string) {return v === changedFilterValue; });
        break;
      case "checkbox":
        // unselect the checkbox
        let changedFilterCheckbox: any = _.find(changedFilter.values, { value: changedFilterValue });
        changedFilterCheckbox.selected = false;
        break;
    }
  };

  private resetFilterPanelModel() {
    _.each(this.ctrl.filterPanelModel, (filter: any) => {
      if (!_.isEmpty(filter.values)) {
        switch (filter.filterType) {
          case "text":
            // clear all keyword filter values
            filter.values = [];
            break;
          case "checkbox":
            // unselect all checkboxes
            _.each(filter.values, (value: any) => {
              value.selected = false;
            });
            break;
        }
      }
    });
  };
}
