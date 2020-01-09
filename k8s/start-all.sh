#! /bin/bash
minikube addons enable ingress
kubectl apply -f ./front/deployment.yaml
kubectl apply -f ./front/service.yaml
kubectl apply -f ./front/ingress.yaml
kubectl apply -f ./bar/deployment.yaml
kubectl apply -f ./bar/service.yaml
kubectl apply -f ./kitchen/chef/multi-with-fridge.yaml
kubectl apply -f ./kitchen/cook/deployment.yaml
kubectl apply -f ./kitchen/cook/service.yaml
kubectl apply -f ./kitchen/fridge/pv.yaml
kubectl apply -f ./kitchen/fridge/pvc.yaml
kubectl apply -f ./kitchen/pastry/cronjob.yaml