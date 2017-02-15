export class MockDataService {
    public getServices(): any {
        return [
            {name: '*Compute Service A', icon: 'pf pficon-screen', category: 'compute', featured: true},
            {name: '*Compute Service B', icon: 'pf pficon-screen', category: 'compute', featured: true},
            {name:  'Compute Service C', icon: 'pf pficon-screen', category: 'compute'},
            {name:  'Compute Service D', icon: 'pf pficon-screen', category: 'compute'},
            {name:  'Compute Service E', icon: 'pf pficon-screen', category: 'compute'},
            {name: '*Network Service A', icon: 'pf pficon-network', category: 'network', featured: true},
            {name: '*Network Service B', icon: 'pf pficon-network', category: 'network', featured: true},
            {name:  'Network Service C', icon: 'pf pficon-network', category: 'network'},
            {name:  'Network Service D', icon: 'pf pficon-network', category: 'network'},
            {name:  'Network Service E', icon: 'pf pficon-network', category: 'network'},
            {name: '*Storage Service A', icon: 'pf pficon-storage-domain', category: 'storage', featured: true},
            {name: '*Storage Service B', icon: 'pf pficon-storage-domain', category: 'storage', featured: true},
            {name:  'Storage Service C', icon: 'pf pficon-storage-domain', category: 'storage'},
            {name:  'Storage Service D', icon: 'pf pficon-storage-domain', category: 'storage'},
            {name:  'Storage Service E', icon: 'pf pficon-storage-domain', category: 'storage'},
            {name: '*Security Service A', icon: 'fa fa-lock', category: 'security', featured: true},
            {name: '*Security Service B', icon: 'fa fa-lock', category: 'security', featured: true},
            {name:  'Security Service C', icon: 'fa fa-lock', category: 'security'},
            {name:  'Security Service D', icon: 'fa fa-lock', category: 'security'},
            {name:  'Security Service E', icon: 'fa fa-lock', category: 'security'}
        ];
    }
}
