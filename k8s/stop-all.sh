#! /bin/bash
kubectl delete all -l app=kube-kitchen
kubectl delete ingresses -l job=maitred
kubectl delete pvc -l job=fridge