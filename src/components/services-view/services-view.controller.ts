import * as angular from 'angular';
import * as _ from 'lodash';

export class ServicesViewController implements angular.IController {
    static $inject = ['Constants', 'Catalog', '$filter', '$scope'];

    static readonly NO_SUBCATEGORY_ROW = -1;

    public ctrl: any = this;
    public cardViewConfig: any;
    private constants: any;
    private catalog: any;
    private $filter: any;
    private $scope: any;
    private subCatMaxRowLength: number = 10;
    private serviceClassesLoaded = false;
    private imageStreamsLoaded = false;

    constructor(constants: any, catalog: any, $filter: any, $scope: any) {
        this.cardViewConfig = {
            selectItems: false,
            showSelectBox: false,
            onClick: this.handleClick
        };
        this.constants = constants;
        this.catalog = catalog;
        this.$filter = $filter;
        this.$scope = $scope;
        this.ctrl.loading = true;
    }

    public $onInit() {
        this.ctrl.allItems = [];
        this.ctrl.currentFilter = 'all';
        this.ctrl.currentSubFilter = null;
        this.ctrl.expandSubCatRow = ServicesViewController.NO_SUBCATEGORY_ROW;
        this.ctrl.orderingPanelvisible = false;

        this.updateAll();

        this.$scope.$on('cancelOrder', () => {
            this.ctrl.closeOrderingPanel();
        });
    }

    public $onChanges(onChangesObj: angular.IOnChangesObject) {
        if (onChangesObj.serviceClasses && !onChangesObj.serviceClasses.isFirstChange()) {
            this.ctrl.serviceClasses = onChangesObj.serviceClasses.currentValue;
            this.serviceClassesLoaded = true;
            this.updateServiceClasses();
        }

        if (onChangesObj.imageStreams && !onChangesObj.imageStreams.isFirstChange()) {
            this.ctrl.imageStreams = onChangesObj.imageStreams.currentValue;
            this.imageStreamsLoaded = true;
            this.updateImageStreams();
        }
    }

    public filterByCategory(category: string, subCategory: string, updateSubCategories: boolean) {
        if (category === 'all' && subCategory === 'all') {
            this.ctrl.filteredItems = this.ctrl.allItems;
        } else {
            this.ctrl.filteredItems = _.filter(this.ctrl.allItems, (item: any) => {
                if (category !== 'all' && subCategory === 'all') {
                    return this.catalog.hasCategory(item, category);
                } else if (category === 'all' && subCategory !== 'all') {
                    return this.catalog.hasSubCategory(item, subCategory);
                } else {
                    return  this.catalog.hasCategory(item, category) && this.catalog.hasSubCategory(item, subCategory);
                }
            });
        }

        if (updateSubCategories) {
            this.ctrl.subCategories = this.getSubCategories(category);
        }

        this.ctrl.expandSubCatRow = this.getRowOfSubCategory(subCategory);

        this.ctrl.currentFilter = category;
        this.ctrl.currentSubFilter = subCategory || 'all';
    }

    public toggleExpand(subCategory: string) {
        if (this.ctrl.currentSubFilter === subCategory) {
            this.ctrl.currentSubFilter = null;
            this.ctrl.expandSubCatRow = ServicesViewController.NO_SUBCATEGORY_ROW;
        } else {
            this.filterByCategory(this.ctrl.currentFilter, subCategory, false);
        }
    }

    public getSubCategories(category: string) {
        let subCats = [{id: 'all', label:  'All'}];
        this.ctrl.categories.map(categoryObj => {
            if (category === 'all' || category === categoryObj.id) {
                subCats = subCats.concat(categoryObj.subCategories);
            }
        });

        subCats = this.makeRows(subCats);

        return subCats;
    };

    public handleClick = (item: any, e: any) => {
        this.ctrl.serviceToOrder = item;
        this.ctrl.openOrderingPanel();
    };

    public openOrderingPanel() {
        this.ctrl.orderingPanelvisible = true;
    };

    public closeOrderingPanel = () => {
        this.ctrl.orderingPanelvisible = false;
    };

    private updateAll() {
        this.updateServiceClasses();
        this.updateImageStreams();
    }

    private updateState() {
        this.ctrl.loading = ((_.isEmpty(this.ctrl.serviceClasses) && !this.serviceClassesLoaded) ||
                             (_.isEmpty(this.ctrl.imageStreams) && !this.imageStreamsLoaded));

        if (!this.ctrl.loading) {
            this.ctrl.filteredItems = this.ctrl.allItems;
            this.ctrl.categories = this.catalog.removeEmptyCategories(this.ctrl.filteredItems);
            this.ctrl.subCategories = this.getSubCategories('all');
        }
    }

    private updateServiceClasses() {
        this.ctrl.allItems = this.ctrl.allItems.concat(this.normalizeData('service', this.ctrl.serviceClasses));
        this.updateState();
    }

    private updateImageStreams() {
        this.ctrl.allItems = this.ctrl.allItems.concat(this.normalizeData('image', this.ctrl.imageStreams));
        this.updateState();
    }

    private makeRows(subCats: any) {
        let subCatsRows: any = [];
        for (let i = 0, len = subCats.length; i < len; i += this.subCatMaxRowLength) {
            subCatsRows.push(subCats.slice(i, i + this.subCatMaxRowLength));
        }
        return subCatsRows;
    }

    private getRowOfSubCategory(subCategory: string) {
        for (let row = 0; row < this.ctrl.subCategories.length; row += 1) {
            for (let card = 0; card < this.ctrl.subCategories[row].length; card += 1) {
                if (this.ctrl.subCategories[row][card].id === subCategory) {
                    return row;
                }
            }
        }
    }

    private normalizeData = (type: string, items: any) => {
        let retSvcs = [];
        let objClass: any;
        _.each(items, (item: any) => {
            if (type === 'service') {
                objClass = this.catalog.getServiceItem(item);
            } else if (type === 'image') {
                objClass = this.catalog.getImageItem(item);
            }
            retSvcs.push(objClass);
        });
        return retSvcs;
    };
}
