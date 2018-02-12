interface IVersionsService {
  compare(v1: string, v2: string): number;
  rcompare(v1: string, v2: string): number;
}

export class VersionsService implements IVersionsService {
  // Don't reimplement this for mock data. Just use the order in the data.
  public compare(v1: string, v2: string): number {
    return 0;
  }
  public rcompare(v1: string, v2: string): number {
    return 0;
  }
}
