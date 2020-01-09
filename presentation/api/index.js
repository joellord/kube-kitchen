const { Client } = require("kubernetes-client");
const client = new Client();

let resp;

const capitalize = (string) => {
  let words = string.split("-");
  words = words.map(word => word.substr(0, 1).toUpperCase() + word.substr(1));
  let sentence = words.join(" ");
  return sentence;
}

async function main() {
  await client.loadSpec();
  resp = await client.api.v1.namespace("default").pods.get();
  let pods = resp.body.items;
  resp = await client.apis.apps.v1.namespaces("default").deployments.get();
  let deployments = resp.body.items;
  resp = await client.api.v1.namespace("default").services.get();
  let services = resp.body.items;
  resp = await client.apis.extensions.v1beta1.namespace("default").ingresses.get();
  let ingresses = resp.body.items;
  resp = await client.apis.batch.v1beta1.namespace("default").cronjob.get();
  let cronjobs = resp.body.items;
  resp = await client.api.v1.namespace("default").persistentvolumeclaim.get();
  let persistentvolumeclaims = resp.body.items;

  let systemSnapShot = {
    front: {},
    bar: {},
    chef: {},
    cook: {},
    fridge: false,
    pastryChef: false
  }

  deployments.map(deployment => {
    let name = deployment.metadata.name;
    name = name.substr(0, name.indexOf("-"));
    systemSnapShot[name].deployment = {
      name: capitalize(name)
    }
  });

  services.filter(service => service.metadata.labels.app == "kube-kitchen").map(service => {
    let sysName = service.metadata.name;
    sysName = sysName.substr(0, sysName.indexOf("-"));
    systemSnapShot[sysName].service = {
      name: capitalize(service.metadata.labels.description)
    }
    if (service.spec.type === "NodePort") {
      systemSnapShot[sysName].service.description = `NodePort\n\nport ${service.spec.ports[0].nodePort}`;
    } else {
      systemSnapShot[sysName].service.description = "Internal\nonly";
    }
  });

  ingresses.map(ingress => {
    let sysName = ingress.spec.backend.serviceName;
    sysName = sysName.substr(0, sysName.indexOf("-"));
    if (!systemSnapShot[sysName].service) systemSnapShot[sysName].service = {};
    systemSnapShot[sysName].service.description = `Ingress\n\nport ${ingress.spec.backend.servicePort}`;
  });

  pods.map(pod => {
    let sysName = pod.metadata.name;
    sysName = sysName.substr(0, sysName.indexOf("-"));
    if (systemSnapShot[sysName]) {
      let identifier = pod.metadata.name.substr(pod.metadata.name.lastIndexOf("-") + 1);
      if (!systemSnapShot[sysName].pods) systemSnapShot[sysName].pods = [];
      systemSnapShot[sysName].pods.push({
        name: `${pod.metadata.labels.job}-${identifier}`,
        status: pod.status.phase
      });
    }
  });

  if (cronjobs.length > 0) {
    systemSnapShot.pastryChef = true;
  }

  if (persistentvolumeclaims.length > 0) {
    systemSnapShot.fridge = true;
  }

  return systemSnapShot;
}

module.exports = main;