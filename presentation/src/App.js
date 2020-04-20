import React, { useState, useEffect } from 'react';
import {Deck, Slide, Footer, Title, List, Image, Text, Subtitle, Browser} from "@sambego/diorama";
import './App.css';
import ImageWithTitle from './components/ImageWithTitle';
import Multistep from "./components/Multistep";
import CodeSlide from "./components/CodeSlide";
import { XTerm } from "./components/XTerm";

import About from "./slides/About";
import ThankYou from "./slides/ThankYou";
import Architecture from "./slides/Architecture";

import ImgKitchenLaptop from "./assets/kitchen-laptop.jpg";
import ImgRamsay from "./assets/ramsay-hells-kitchen.jpg";
import ImgBaccara from "./assets/baccara.png";
import ImgBillCash from "./assets/bill-cash.jpg";
import ImgFoodtruck from "./assets/foodtruck.jpg";
import ImgPizzeria from "./assets/pizzeria.jpg";
import ImgBuffet from "./assets/buffet.jpg";
import ImgUpscale from "./assets/upscale.jpg";
import ImgGrandOpening from "./assets/grandopening.jpg";
import ImgWoohoo from "./assets/woohoo.gif";
import ImgStickers from "./assets/ihavestickers.jpg";
import ImgPoutine from "./assets/poutine.jpg";
import ImgRent from "./assets/forrent.jpg";
import ImgLease from "./assets/lease.jpg";
import ImgStaff from "./assets/staff.jpg";
import ImgMaitreD from "./assets/maitred.jpg";
import ImgWaiters from "./assets/waiters.jpg";
import ImgWaiter from "./assets/waiter.jpg";
import ImgBartender from "./assets/bartenders.jpg";
import ImgCooks from "./assets/cooks.jpg";
import ImgChef from "./assets/chef.jpg";
import ImgAngryChef from "./assets/angrychef.jpg";
import ImgPastryChef from "./assets/pastrychef.jpg";
import ImgFridge from "./assets/fridge.jpg";
import ImgStaff2 from "./assets/staff2.jpg";

const SHOW_NOTES = true;

const talkProps = {
  title: "Kube Kitchen",
  conference: "BocaJS",
  conferenceHashTag: "#BocaJS",
  date: "March 3, 2020",
  moreInfoUrl: "ezurl.to/kube-kitchen"
}

function App() {
  const [browserUrl, setBrowserUrl] = useState("");

  useEffect(() => {
    fetch("/minikubeIp").then(resp => resp.json()).then(resp => {
      setBrowserUrl(`http://${resp.ip}`);
    });
  });

  const footer = <Footer left={`@joel__lord ${talkProps.conferenceHashTag}`} right="&nbsp;" />

  return (
    <Deck swipeToChange={false} footer={footer} presenterNotes={SHOW_NOTES}>
      
      <ImageWithTitle title={talkProps.title} img={ImgUpscale} notes="
      I will start by telling you this. I am a foodie. I love good food. 
      I love food and food tv shows.
      And when I first started playing around with Kubernetes. I immediatly thought 'Bloody hell!'.
      " />   
      <ImageWithTitle title="Kubernetes Hell's Kitchen" img={ImgRamsay} notes="
       So as you might've guessed by now, this is what led me to this talk. 
       A mix of Kubernetes Hell and a passion for Food Network.
       Unfortunately, I don't own the rights to Hell's Kitchen and Gordon Ramsay's pictures
       so I will stick to much more smilier stock images for now.
       " />      
      <ImageWithTitle title={talkProps.title} img={ImgKitchenLaptop} notes="
      So, Kubernetes is a beast. 
      When I first had to learn it, I thought it would be easy. I mean, I can pick up new languages and so on, it's not that complex.
      But this devops thingy was a whole new world to me and it was a complex beast to tame.
      But it turns out, it's not that complex. The only thing Kubernetes does is spin up or down containers and manages the networking.
      That's it. It's an orchestration tool that aims at making easier to manage your containers.
      It seems easy now, doesn't it?
      Well, theere are many ways to scale up and down and maintan those containers. And the documentation is not easy when you're new to this.
      In this talk, I will try to cover the basic building blocks of Kubernetes. 
      As least so you have enough knowledge to know what to google when you'll need it.
      Once you understand those, you should be able to start making sense of the documentation and get up and running with k8s.
      " />

      <Multistep notes={""}>
        <Title>What Does It Solve</Title>
        <List>
          <li>Distributes containers in a logical and efficient way</li>
          <li>Scale up and down fast</li>
          <li>Keep processes continuously working</li>
          <li>All of this with yaml files</li>
        </List>
      </Multistep>

      <ImageWithTitle title={"Take My Money"} img={ImgBillCash} notes="
      So will it solve all your problems? No!"
      />

      <Slide notes="
      Maybe your application is like this. It does one thing at the time.
      You don't have millions of users but you need to make sure that they are served in a timely fashion.
      Maybe you've joined the JAM Stack movement and have a static website.
      Or maybe you have a Wordpress or Laravel application.
      Then the food truck model is probably better suited for you.
      An application hosted on netlify, github pages or any virtual host will ensure that your application is stable and you won't have to worry about it.
      It is also much easier to deploy to and to maintain.
      ">
        <Image src={ImgFoodtruck} full />
      </Slide>

      <Slide notes="
      Or maybe you have a pizzeria. A small shop but with a relatively simple workflow.
      One person at the cashier and one person in the kitchen.
      It's a startup. You have a front-end and a back-end. Not too many customers but you can start
      with best practices. Use containers to deploy your application but you can easily use a service like heroku to handle this.
      It will integrate easily with your work process and eventually make it easier to scale up.
      ">
        <Image src={ImgPizzeria} full />
      </Slide>

      <Slide notes="
      Or maybe you have a buffet. Everything is ready for your customers to use. 
      They can take what they want and then they leave it for the next one.
      Kind of like a serverless architecture. If there is not real heavy lifting and you need small operations.
      There are ways to do serverless with kubernetes but it's still in its infancy.
      You'd be better off using lambda or azure functions
      ">
        <Image src={ImgBuffet} full />
      </Slide>

      <Slide notes="
      But if you have an upscale restaurant, that is diffent.
      You will need multiple staff members. Each one has a very specific role. Some people are allowed to speak to each others and some aren't.
      The processes are more complex. A single plate might require the input from many cooks.
      And you can't have a single point of failure. You need all those parts at any given moment.
      This is where Kubernetes comes handy.
      It will help ensure that all the people are at the right place, at the right time and help with those lines of communication.
      ">
        <Image src={ImgBaccara} full />
      </Slide>

      <Multistep notes={""}>
        <Title>What k8s does?</Title>
        <List>
          <li>Deploy more or less containers</li>
          <li>Distributes the load</li>
          <li>Takes care of networking</li>
        </List>
      </Multistep>

      <ImageWithTitle img={ImgGrandOpening} title={"Grand Opening"} notes="
      It's now time for our grand opening. But before we do so, let me introduce myself
      " />

      <About />

      <ImageWithTitle img={ImgWoohoo} title="Twitter Notifications" />
      {/* <ImageWithTitle img={ImgStickers} title="I Have Stickers" /> */}

      <ImageWithTitle img={ImgPoutine} title="Grand Opening" notes="
      Back to our subject. We are opening a restaurant. We will serve poutine because... French Canadian heritage.
      But not any poutine. We will serve upscale poutine. Like foie gras poutine or this amazing duck confit poutine.
      The first thing we'll need is an actual place to open this restaurant.
      " />

      <Slide notes="
      We not only need a space but we need to make sure that we have all the required facilities.
      Our space will need to have obviously some electricity and some gas for our ovens. It will ideally also have wall already up. Maybe even a kitchen.
      Of course, we won't build all of this. We want to be downtown and we can't just build another new building.
      So we'll rent out a space. 
      ">
        <Image src={ImgRent} full />
      </Slide>

      <Slide notes="
      When we rent out this space, we will sign an agreement with the owner.
      The owner will guarantee a given set of resources. It will also take care of fixing any issues we might have in our rented space.
      ">
        <Image src={ImgLease} full />
      </Slide>

      <Slide notes="
      Just like we rent out our retail space, we can rent out a Kubernetes cluster.
      Major providers have those available for you to use. Azure, Google, Digital Ocean and, of course, Red Hat OpenShift.
      Standard tools can be used to manage those but they all have their own tooling available too.
      Nodes can be either physical machines or virtual machines.
      ">
        <Title>Kubernetes Cluster</Title>
        <Text>A set of machines, called nodes, that run containerized applications managed by Kubernetes. </Text>
        <Text>A cluster has at least one worker node and at least one master node.</Text>
      </Slide>

      <Slide notes="
      In our case, we only have one node. I am running minikube on this machine which is a tool that lets you run a small k8s cluster on your laptop.
      Our restaurant also only has one node. All of our pods are going to run in this single worker node.
      ">
        <Title>Worker Nodes</Title>
        <Text>The worker node(s) host the pods that are the components of the application. </Text>
      </Slide>

      <Slide notes="
      The master node takes care of deciding where the other units should live.
      It will distribute the containers in a logical and efficient manner.
      Multiple master nodes will ensure that we have failover.
      If something fails, our owner (the master node) will fix it for us.
      ">
        <Title>Master Nodes</Title>
        <Text>The master node(s) manages the worker nodes and the pods in the cluster. </Text>
        <Text>Multiple master nodes are used to provide a cluster with failover and high availability.</Text>
      </Slide>

      <Slide notes="I'll be using minikube, so to start a local cluster, it's just a matter of `minikube start`. It takes a few minutes so I already started mine.">
        <Subtitle>Start your cluster</Subtitle>
        <Text>&nbsp;</Text>
        <pre>
          <code style={{fontSize: "2vw"}}>
            $ minikube start
          </code>
        </pre>
        <Text>&nbsp;</Text>
        <Text>Minikube is available at <a href="https://github.com/kubernetes/minikube/releases">github.com/kubernetes/minikube</a></Text>
      </Slide>

      <Slide notes="
      Next, we'll need a staff. We will need a bunch of different people for our restaurant.
      All of those people have very specific expertises that we will need to explore.
      In here we have our chef, our manager or maitre d', our waiters, our cooks and so on.
      As it gets busy, we will need more and more. And they can't work all the time, so we'll need to replace them from time to time.
      Without them, nothing happens, it's just an empty building.
      ">
        <Image src={ImgStaff} full />
      </Slide>

      <Slide notes="
      Just like our staff, the pods are the workers in our cluster.
      They are composed of normally one container that will do a specific job.
      They live on the nodes and can be destroyed at any moment to be replaced by another one.
      In order to find them, we will be using labels. In fact, all the k8s objects will have labels.
      Most of our staff in the following examples will be represented by pods.
      ">
        <Title>Pods</Title>
        <List>
          <li>Smallest unit in Kubernetes</li>
          <li>A pod contains (or sometimes more) containers</li>
          <li>Pods are colocated on the node(s)</li>
          <li>Identified by labels</li>
        </List>
      </Slide>

      <Slide notes="
      You can't just let the waiters work whenever they want. Some of them would be too greedy and work too much. Others would only come on Fridays and Saturdays where they actually make some decent money.
      If you have too few of them, the customers will suffer. If you have too many, it will cost you a lot of money.
      That will be a job for a Maitre D. She is in charge of ensuring that everything goes roundly.
      And also, she makes the schedules.
      ">
        <Image src={ImgMaitreD} full />
      </Slide>

      <Slide>
        <Title>Deployments</Title>
        <Text>An API object that manages a replicated application. Each replica is represented by a Pod , and the Pods are distributed among the nodes of a cluster.</Text>
      </Slide>

      <Slide>
        <Title>Deployments</Title>
        <List>
          <li>Deployments describe the plan for our pods</li>
          <li>How many we need, where we need them as so on</li>
          <li>Uses ReplicaSets to ensure that the configured number of Pods are running in your cluster</li>
        </List>
      </Slide>

      <CodeSlide title="k8s yaml" lang="yaml">
        {`
apiVersion: VERSION
kind: OBJECT
metadata: NAME AND LABELS
spec: PARAMETERS
        `}
      </CodeSlide>

      <CodeSlide title="Deployments" lang="yaml">
        {`
apiVersion: apps/v1
kind: Deployment
        `}
      </CodeSlide>

      <CodeSlide title="Deployments" lang="yaml">
        {`
metadata:
  name: front-deployment
  labels:
    app: kube-kitchen
    job: maitred
    section: front
        `}
      </CodeSlide>
      <CodeSlide title="Deployments" lang="yaml">
        {`
spec:
  replicas: 3
  selector: 
    matchLabels:
      job: waiter
  template:
    ...
        `}
      </CodeSlide>
      <CodeSlide title="Deployments" lang="yaml">
        {`
  template:
    metadata: 
      labels:
        app: kube-kitchen
        section: front
        job: waiter
    spec:
      containers:
      - name: front
        image: joellord/kk-front:latest
        ports: 
        - containerPort: 80
        `}
      </CodeSlide>

      <CodeSlide title="Deployments" lang="yaml">
        {`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: front-deployment
  labels:
    app: kube-kitchen
    job: maitred
    section: front
spec:
  replicas: 1
  selector: 
    matchLabels:
      job: waiter
  template:
    metadata: 
      labels:
        app: kube-kitchen
        section: front
        job: waiter
    spec:
      containers:
      - name: front
        image: joellord/kk-front:latest
        ports: 
        - containerPort: 80
        `}
      </CodeSlide>

      <Slide notes="
      kubectl get all;
      kubectl apply -f ./front/deployment.yaml;
      kubectl get all;
      nano ./front/deployment.yaml; -- scale up
      kubectl apply -f ./front/deployment.yaml;
      kubectl get all;
      ">
        <Title>Deployment</Title>
        <XTerm />
      </Slide>

      <Architecture />

      <Slide notes="
      Our Maitre D now has three waiters on the floor.
      But right now, there is no way to find the waiters. You don't know if it's John or Simone who are working tonight.
      You don't even know where they are.
      ">
        <Image src={ImgWaiters} full />
      </Slide>

      <Slide>
        <Title>Services</Title>
        <Text>An abstract way to expose an application running on a set of Pods as a network service.</Text>
      </Slide>

      <Slide>
        <Title>Services</Title>
        <List>
          <li>Acts as a way to find pods</li>
          <li>You can communicate directly with pods but hard to keep track</li>
          <li>Will do load balancing for you</li>
        </List>
      </Slide>

      <CodeSlide title="Services" lang="yaml">
        {`
apiVersion: apps/v1
kind: Service
        `}
      </CodeSlide>

      <CodeSlide title="Services" lang="yaml">
        {`
metadata:
  name: front-service
  labels:
    app: kube-kitchen
    section: front
        `}
      </CodeSlide>

      <CodeSlide title="Services" lang="yaml">
        {`
spec:
  selector:
    job: waiter
  ports:
    - port: 80
      protocol: TCP
        `}
      </CodeSlide>

      <CodeSlide title="Services" lang="yaml">
        {`
apiVersion: v1
kind: Service
metadata:
  name: front-service
  labels:
    app: kube-kitchen
    section: front
spec:
  selector:
    job: waiter
  ports:
    - port: 80
      protocol: TCP
        `}
      </CodeSlide>

      <Slide notes="
      kubectl get svc;
      kubectl apply -f ./front/service.yaml;
      kubectl get svc;
      kubectl get all -l section=front;
      ">
        <Title>Services</Title>
        <XTerm />
      </Slide>

      <Slide notes="
      So our Maitre D now knows where his waiting staff is, that's good. 
      But as a customer, you need to talk to your waiter. You won't go in the kitchen to order your food.
      The waiter is your door to the system. Or your front-end if you will.
      ">
        <Image src={ImgWaiter} full />
      </Slide>
      
      <Slide>
        <Title>Ingress</Title>
        <Text>An API object that manages external access to the services in a cluster, typically HTTP. Ingress can provide load balancing, SSL termination and name-based virtual hosting.</Text>
      </Slide>

      <Slide>
        <Title>Ingress</Title>
        <List>
          <li>Exposes your cluster</li>
          <li>Can support multiple sub path</li>
          <li>Will route based on the request</li>
        </List>
      </Slide>

      <CodeSlide title="Ingress" lang="yaml">
        {`
apiVersion: extensions/v1beta1
kind: Ingress
        `}
      </CodeSlide>

      <CodeSlide title="Services" lang="yaml">
        {`
metadata:
  name: front-ingress
  labels:
    app: kube-kitchen
    section: front
        `}
      </CodeSlide>

      <CodeSlide title="Services" lang="yaml">
        {`
spec:
  backend:
    serviceName: front-service
    servicePort: 80
        `}
      </CodeSlide>

      <CodeSlide title="Services" lang="yaml">
        {`
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: front-ingress
  labels:
    app: kube-kitchen
    section: front
spec:
  backend:
    serviceName: front-service
    servicePort: 80
        `}
      </CodeSlide>

      <Slide notes="
      kubectl apply -f ./front/ingress.yaml;
      kubectl get ingress;
      Look at the public IP;
      ">
        <Title>Services</Title>
        <XTerm />
      </Slide>

      <Architecture />

      <Slide>
        <Browser url={browserUrl}></Browser>
      </Slide>

      <Slide notes="
      Now that we have our waiters, the first thing we'll want to do is order a drink.
      So we'll need to setup a bar. Bartenders are notoriously know for not being reliable. Between the drinking and flirting, they can be hard to find.
      In order to help with this, we will still need a service to find them.
      Finally, we'll also need to find a way to communicate with them. This communication is traditionaly done via the waiter.
      ">
        <Image src={ImgBartender} full />
      </Slide>

      <CodeSlide title="Bartender Deployment" lang="yaml" notes="
      The main difference between our waiter deployment here is in the containers section.
      We want to make sure that they always restart when they crash.
      ">
        {`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bar-deployment
  labels:
    app: kube-kitchen
    section: bar
spec:
  replicas: 2
  selector: 
    matchLabels:
      job: barman
  template:
    metadata: 
      labels:
        app: kube-kitchen
        section: bar
        job: barman
    spec:
      containers:
      - name: bar
        image: joellord/kk-bar:latest
        ports: 
        - containerPort: 3000
      restartPolicy: Always
        `}
      </CodeSlide>

      <Slide>
        <Title>NodePort</Title>
        <Text>Exposes the Service on each Node’s IP at a static port. A ClusterIP Service, to which the NodePort Service routes, is automatically created. </Text>
      </Slide>

      <Slide>
        <Title>NodePort</Title>
        <List>
          <li>Part of the Service</li>
          <li>Works well when there is a single node</li>
          <li>Not recommended for most cases</li>
          <li>Providers have different ways to create "Routes"</li>
        </List>
      </Slide>

      <CodeSlide title="Bar Service" lang="yaml" notes="
      ">
        {`
apiVersion: v1
kind: Service
metadata:
  name: bar-service
  labels:
    app: kube-kitchen
    section: bar
spec:
  type: NodePort
  selector:
    job: barman
  ports:
  - port: 3000
    nodePort: 31300
        `}
      </CodeSlide>

      <Slide notes="
      kubectl apply -f ./bar/deployment.yaml;
      kubectl apply -f ./bar/service.yaml;
      kubectl get all pods -l job=bar;
      kubectl delete pod XXX;
      kubectl get all pods -l job=bar;
      kubectl get all -l sec;
      Look at the public IP;
      ">
        <Title>Bar Service and Deployment</Title>
        <XTerm />
      </Slide>

      <Architecture />

      <Slide>
        <Browser url={browserUrl}></Browser>
      </Slide>

      <Slide notes="
      It's now time to go to the kitchen. Where the real work happens. 
      Now a lot of people tend to think that there is a chef preparing their food behind there. It's not entirely true.
      There is a bunch of people doing a bunch of things. Each one has a designated stations and they follow the orders of the chef.
      Those cooks are replaceable and will even change place during the course of a shift but the chef always know where they are.
      ">
        <Image src={ImgCooks} full />
      </Slide>

      <CodeSlide title="Cook Deployment" lang="yaml">
        {`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cook-deployment
  labels:
    app: kube-kitchen
    section: kitchen
spec:
  replicas: 2
  selector: 
    matchLabels:
      job: cook
  template:
    metadata: 
      labels:
        app: kube-kitchen
        section: kitchen
        job: cook
    spec:
      containers:
      - name: cook
        image: joellord/kk-cook:latest
        ports: 
        - containerPort: 3000

        `}
      </CodeSlide>

      <CodeSlide title="Cook Service" lang="yaml">
        {`
apiVersion: v1
kind: Service
metadata:
  name: cook-service
  labels:
    app: kube-kitchen
    section: kitchen
spec:
  selector:
    job: cook
  ports:
  - port: 3000        
        `}
      </CodeSlide>

      <Slide notes="
      kubectl apply -f ./kitchen/cook/deployment.yaml;
      kubectl apply -f ./kitchen/cook/service.yaml;
      kubectl get all -l job=cook;
      ">
        <Title>Cook Service and Deployment</Title>
        <XTerm />
      </Slide>

      <Architecture />

      <Slide notes="
      This brings us to our chef. There is normally only one. The chef will dispatch the orders to the cooks and then take all the elements to do the finaly assembly.
      He will bring the final touch to it. He gives the final approval to the plate.
      ">
        <Image src={ImgChef} full />
      </Slide>

      <Slide notes="
      But the chef is also the gatekeeper to the kitchen. It the customers or (god forbid) the waiters were to start talking to the cooks, it would be a nightmare.
      So our chef will need to communicate with the cooks. But also with the waiter.
      ">
        <Image src={ImgAngryChef} full />
      </Slide>

      <CodeSlide title="Chef" lang="yaml" notes="
      You can deploy multiple objects by using a single file. You just need to separate them with ---
      ">
        {`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: chef-deployment
  labels:
    app: kube-kitchen
    section: kitchen
spec:
  replicas: 1
  selector: 
    matchLabels:
      job: chef
  template:
    metadata: 
      labels:
        app: kube-kitchen
        section: kitchen
        job: chef
    spec:
      containers:
      - name: chef
        image: joellord/kk-chef:latest
        ports: 
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: chef-service
  labels:
    app: kube-kitchen
    section: kitchen
spec:
  type: NodePort
  selector:
    job: chef
  ports:
  - port: 3000
    nodePort: 32300

        `}
      </CodeSlide>

      <Slide notes="
      kubectl apply -f ./kitchen/chef/multi.yaml;
      kubectl get all -l job=chef
      ">
        <Title>Chef</Title>
        <XTerm />
      </Slide>

      <Architecture />

      <Slide notes="
      Now that we have a chef and some cooks, we should be able to order some food.
      Notice how the food is prepared by different cooks.
      ">
        <Browser url={browserUrl} />
      </Slide>

      <CodeSlide title="Environment Variables" lang="js" notes="
      We can find the address of the different services using the internal DNS.
      Or by using environment variables that are injected inside your pods.
      ">
        {`
const HOST = process.env.COOK_SERVICE_SERVICE_HOST;
const PORT = process.env.COOK_SERVICE_SERVICE_PORT;
const COOK_URL = \`http://\${HOST}:\${PORT}\`;        
        `}
      </CodeSlide>

      <Architecture notes="
      So we now have this whole architecture. 
      All the networking is done, and if something breaks, it gets automatically repaired.
      But we can do more stuff with K8s
      " />

      <Slide notes="
      But not everything acts like a server. Our pastry chef is an example of such sort.
      If you order a piece of cake or some chocolate truffles, the pastry chef doesn't start making them right now.
      The pastry team was working all day long to produces all those delicious sweets. 
      ">
        <Image src={ImgPastryChef} full />
      </Slide> 

      <Slide>
        <Title>Cron Jobs</Title>
        <List>
          <li>Containers don't need to run servers</li>
          <li>Could be a cli or a daemon</li>
          <li>Or in this case, a cron job</li>
        </List>
      </Slide>

      <CodeSlide title="Cron Jobs" lang="yaml" notes="
      Emphasis on the schedule part of the spec
      ">
        {`
apiVersion: batch/v1beta1
kind: CronJob
        `}
      </CodeSlide>

      <CodeSlide title="Cron Jobs" lang="yaml" notes="
      Emphasis on the schedule part of the spec
      ">
        {`
metadata:
  name: pastry-cronjob
  labels: 
    app: kube-kitchen
    section: kitchen
    job: pastry
        `}
      </CodeSlide>

      <CodeSlide title="Cron Jobs" lang="yaml" notes="
      Emphasis on the schedule part of the spec
      ">
        {`
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: pastry
            image: joellord/kk-pastry:latest
          restartPolicy: OnFailure
        `}
      </CodeSlide>

      <CodeSlide title="Cron Jobs" lang="yaml" notes="
      Emphasis on the schedule part of the spec
      ">
        {`
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: pastry-cronjob
  labels: 
    app: kube-kitchen
    section: kitchen
    job: pastry
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: pastry
            image: joellord/kk-pastry:latest
          restartPolicy: OnFailure
        `}
      </CodeSlide>
      
      <Slide notes="
      They then store everything in the fridge where the chef will be able to get them and do the final touches.
      ">
        <Image src={ImgFridge} full />
      </Slide>

      <Slide>
        <Title>Persistent Volume Claims</Title>
        <List>
          <li>After a pod is terminated, everything is destroyed</li>
          <li>You need a way to persist data and share it</li>
          <li>You can claim some space made available by your admin</li>
        </List>
      </Slide>

      <CodeSlide title="Persistent Volume" lang="yaml" notes="
      Defined by the admin
      Specifies what is available for your cluster
      ">
        {`
apiVersion: v1
kind: PersistentVolume
metadata:
  name: fridge-pv
  labels:
    app: kube-kitchen
    section: kitchen
    job: fridge
spec:
  storageClassName: manual
  capacity:
    storage: 2Gi
  accessModes:
    - ReadWriteMany
    - ReadWriteOnce
    - ReadOnlyMany
  hostPath:
    path: "/mnt/data"        
        `}
      </CodeSlide>

      <CodeSlide title="Persistent Volume Claims" lang="yaml" notes="
      Find a PV that matches and assigns it a name and persist data
      ">
        {`
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: fridge-pvc
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 1Gi     
        `}
      </CodeSlide>

      <CodeSlide title="Mounting a Volume" lang="yaml" notes="
      In the spec of our deployment for both our chef and our pastry chef, we will add:

      ">
        {`
spec:
  volumes:
  - name: pastry-fridge
    persistentVolumeClaim:
      claimName: fridge-pvc
  containers:
  - name: chef
    image: joellord/kk-chef:latest
    ports: 
    - containerPort: 3000
    volumeMounts:
    - mountPath: "/desserts"
      name: pastry-fridge  
        `}
      </CodeSlide>

      <Slide>
        <Title>Deploy Fridge, Pastry and chef</Title>
        <XTerm />
      </Slide>

      <Slide>
        <Title>Full Application</Title>
        <Browser url={browserUrl} />
      </Slide>

      <Architecture />

      <Slide>
        <Subtitle>Recap</Subtitle>
        <List className="smallerText">
          <li>Cluster: a set of machines (nodes)</li>
          <li>Master Node: manages the worker node(s)</li>
          <li>Worker Node: hosts the pods</li>
        </List>
      </Slide>

      <Slide>
        <Subtitle>Recap</Subtitle>
        <List className="smallerText">
          <li>Pods: basic unit</li>
          <li>Deployment: a schedule for pods</li>
          <li>Service: load balancing and access to the pods</li>
          <li>Ingress: exposes a service</li>
          <li>NodePort: opens a direct port on a node</li>
          <li>CronJob: runs a job at a given interval</li>
        </List>
      </Slide>

      <Slide>
        <Subtitle>Recap</Subtitle>
        <List className="smallerText">
          <li>Persistent Volume: available disk blocks</li>
          <li>Persistent Volume Claim: a mountable disk</li>
        </List>
      </Slide>

      <Slide>
        <Subtitle>Recap</Subtitle>
        <List className="smallerText">
          <li>kubectl apply -f &lt;yaml-file&gt;</li>
          <li>kubectl get &lt;object-type&gt; </li>
          <li>kubectl get all -l &lt;label=value&gt;</li>
          <li>kubectl describe &lt;object-name&gt;</li>
          <li>kubectl logs (-f) &lt;object-name&gt;</li>
          <li>kubectl exec -it &lt;object-name&gt; -- /bin/bash</li>
          <li></li>
        </List>
      </Slide>

      <Slide>
        <Title>Moar K8s!</Title>
        <XTerm />
      </Slide>

      <Slide notes="
      Obviously, this was an oversimplification of a very complex thing. 
      Running a restaurant is much more complex than that. I haven't talked about the various roles in the kitchen like a grill master or a garde-manger.
      I have also left out all the different roles in the dining rooms. Not all waiters are equal.
      And of course, some of the important things like a sommelier have also been left aside for the sake of simplicity.
      In the same way, we can't describe all of Kubernetes in a one hour talk but this should be enough to give you the foundation you need to get started.
      ">
        <Image src={ImgStaff2} full />
      </Slide>

      <Slide>
        <Title>More resources</Title>
        <List>
          <li><a href="http://kubernetes.io">Kubernetes official doc</a></li>
          <li><a href="https://cloud.google.com/kubernetes-engine/kubernetes-comic/">Google Cloud K8s Comic</a></li>
          <li><a href="https://www.cncf.io/phippy/">Phippy and Friends</a></li>
        </List>
      </Slide>

      <ThankYou 
        title={talkProps.title} 
        conference={talkProps.conference} 
        date={talkProps.date} 
        moreInfoUrl={talkProps.moreInfoUrl} 
      />

      <Slide>
        Last slide for presenter notes purposes
      </Slide>
    </Deck>
  );
}

export default App;
