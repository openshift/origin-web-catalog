interface IAuthorizationService {
  canIAddToProject(projectName: string) : boolean;
}

export class AuthorizationService implements IAuthorizationService {
  public canIAddToProject (projectName: string) {
    // can add to any project except 'my-proj-a'
    return !(projectName === 'my-proj-a');
  };
}
