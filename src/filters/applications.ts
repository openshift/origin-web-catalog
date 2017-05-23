export function applicationHasDeploymentFilter ($filter: any) {
  var annotation = $filter('annotation');
  return function(replicaSet: any) {
    return annotation(replicaSet, 'deployment.kubernetes.io/revision');
  };
}

export function applicationHasDeploymentConfigFilter ($filter: any) {
  var annotationFilter = $filter('annotation');
  return function(deployment: any) {
    return annotationFilter(deployment, 'deploymentConfig');
  };
}
