const k8s = require('@kubernetes/client-node');
 
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
 
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
 
k8sApi.listPodForAllNamespaces().then((res) => {
    console.log(res.body.items.filter(pod => pod.metadata.labels.app == "kube-kitchen").map(pod => pod.metadata.name));
});

k8sApi.listServiceForAllNamespaces().then((res) => {
  console.log(res.body.items.filter(svc => {
    return svc.metadata.labels.app && svc.metadata.labels.app == "kube-kitchen"
  }).map(svc => svc.metadata.name));
});

k8sApi.listPersistentVolume().then((res) => {
  console.log(res.body.items.map(pv => pv.metadata.name));
});

k8sApi.listPersistentVolumeClaimForAllNamespaces().then((res) => {
  console.log(res.body.items.map(pvc => pvc.metadata.name));
});

k8sApi.list