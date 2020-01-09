import React, { Component } from "react";
import { Slide, Subtitle } from "@sambego/diorama";

// const protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
// const port = window.location.port ? `:${window.location.port}` : '';
// const socketUrl = `${protocol}${window.location.hostname}${port}/k8s`;
// const socket = new WebSocket(socketUrl);
let interval;

export default class Architecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: {},
      bar: {},
      chef: {},
      cook: {},
      fridge: false,
      pastryChef: false
    }
  }
  componentDidMount() {
    class Rectangle {
      constructor (
        x = 0, y = 0,
        width = 0, height = 0,
        fillColor = '', strokeColor = '', strokeWidth = 2,
        title = "", description = ""
      ) {
        this.x = Number(x)
        this.y = Number(y)
        this.width = Number(width)
        this.height = Number(height)
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.strokeWidth = strokeWidth
        this.title = title;
        this.description = description;
    
        this.TITLEFONT = "16px Arial";
        this.DESCRIPTIONFONT = "12px Arial";
      }
      get left () {
        return this.x
      }
      get right () {
        return this.x + this.width
      }
      get top () {
        return this.y
      }
      get bottom () {
        return this.y + this.height
      }
    
      draw () {
        const {
          x, y, width, height,
          fillColor, strokeColor, strokeWidth
        } = this
    
        ctx.save()
    
        ctx.fillStyle = fillColor
        ctx.lineWidth = strokeWidth
    
        ctx.beginPath()
        ctx.strokeStyle = strokeColor
        ctx.rect(x, y, width, height)
    
        ctx.fill();
        ctx.stroke();
    
        let titleBoxHeight = 0;
    
        if (this.title) {
          ctx.fillStyle = "black";
          ctx.font = this.TITLEFONT;
          ctx.textAlign = "center";
          ctx.fillText(this.title, this.width/2 + this.x, 20 + this.y);
    
          titleBoxHeight = 30;
          ctx.moveTo(this.x, this.y + titleBoxHeight);
          ctx.lineTo(this.x + this.width, this.y + titleBoxHeight);
          ctx.stroke();
        }
    
        if (this.description) {
          ctx.fillStyle = "black";
          ctx.font = this.DESCRIPTIONFONT;
          ctx.textAlign = "center";
          let lines = this.description.split("\n");
          lines.map((line, i) => {
            ctx.fillText(line, this.width/2 + this.x, this.y + titleBoxHeight + 20 + 20*i);
            return true;
          });
        }
    
        ctx.restore()
      }
    }
    
    class KubeObj {
      constructor (x = 0, y = 0, objectDetails) {
        this.x = Number(x);
        this.y = Number(y);
        if (!objectDetails) throw new Error("Can't create Kube Object without details");
        if (!objectDetails.pods) objectDetails.pods = [];
        if (!objectDetails.service) objectDetails.service = {};
        if (!objectDetails.deployment) objectDetails.deployment = {};
        this.props = objectDetails;
      }
    
      erase() {
        ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
      }
    
      draw() {
        let titleHeight = 40;
        let podHeight = 30;
        let minHeight = 150;
        let podSpacing = 10;
        let totalHeight = Math.max(titleHeight + (podHeight + podSpacing) * this.props.pods.length, minHeight);
        let svcWidth = 100;
        let deploymentWidth = 150;
        
        // Draw Deployment Box
        let deploymentBox = new Rectangle(this.x + svcWidth, this.y, deploymentWidth, totalHeight, "white", "black", 1, this.props.deployment.name);
        deploymentBox.draw();
    
        // Draw svc Box
        let svcBoxHeight = parseInt(totalHeight * 0.8);
        let svcBoxMargin = (totalHeight - svcBoxHeight) / 2;
        let svcBox = new Rectangle(this.x, this.y + svcBoxMargin, svcWidth, svcBoxHeight, "white", "black", 1, this.props.service.name, this.props.service.description);
        svcBox.draw();
    
        // Draw pods
        let podWidth = parseInt(deploymentBox.width * 0.9);
        let podMargin = (deploymentBox.width - podWidth) / 2;
        podMargin = parseInt(podMargin);
        this.props.pods.map((pod, i) => {
          let statusColor = "blue";
          if (pod.status === "Running") statusColor = "green";
          if (pod.status === "Failed") statusColor = "red";
          let podBox = new Rectangle(deploymentBox.x + podMargin, deploymentBox.y + titleHeight + (podHeight + podSpacing) * i, podWidth, podHeight, "white", statusColor, 2, "", pod.name);
          podBox.draw();
          return true;
        });
    
        this.width = deploymentBox.width + svcBox.width;
        this.height = deploymentBox.height;
      }
    }
    
    class Link {
      constructor(obj1, obj2) {
        if (!obj1 || !obj2) throw new Error("Missing an object");
        this.obj1 = obj1;
        this.obj2 = obj2;
      }
    
      draw() {
        const {obj1, obj2} = this;
        let fromX = obj1.x + obj1.width;
        let fromY = obj1.y + obj1.height/2;
        let toX = obj2.x;
        let toY = obj2.y + obj2.height / 2;
    
        ctx.save();
        ctx.fillColor = "black";
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.restore();
      }
    }
    
    function drawArchitecture(front, bar, chef, cook, fridge, pastry) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let frontObj, barObj, chefObj, cookObj, fridgeObj, pastryChefObj;

      let frontExists = Object.getOwnPropertyNames(front).length > 0;
      let barExists = Object.getOwnPropertyNames(bar).length > 0;
      let chefExists = Object.getOwnPropertyNames(chef).length > 0;
      let cookExists = Object.getOwnPropertyNames(cook).length > 0;
      let fridgeExists = !!fridge;
      let pastryExists = !!pastry;

      let colX = [0, 300, 600, 850];
      let Y = [50, 250];
      if (!pastryExists) {
        colX = [150, 450, 750];
      }
      if (!fridgeExists && !cookExists) {
        colX = [250, 600];
      }
      if (!chefExists && !barExists) {
        colX = [500];
      }
      if (frontExists) {
        frontObj = new KubeObj(colX[0], Y[0], front);
        frontObj.draw();
      }
      if (barExists) {
        barObj = new KubeObj(colX[1], Y[0], bar);
        barObj.draw();
      }
      if (chefExists) {
        chefObj = new KubeObj(colX[1], Y[1], chef);
        chefObj.draw();
      }
      if (cookExists) {
        cookObj = new KubeObj(colX[2], Y[1], cook);
        cookObj.draw();
      }
      if (fridgeExists) {
        fridgeObj = new Rectangle(colX[2], Y[0], 200, 100, "white", "black", 1, "Fridge", "Contains X desserts");
        fridgeObj.draw();
      }
      if (pastryExists) {
        pastryChefObj = new Rectangle(colX[3], Y[0], 200, 100, "white", "black", 1, "Pastry Chef", "producing desserts");
        pastryChefObj.draw();
      }
      if (frontExists && barExists) {
        let frontBarLink = new Link(frontObj, barObj);
        frontBarLink.draw();
      }
      if (frontExists && chefExists) {
        let frontChefLink = new Link(frontObj, chefObj);
        frontChefLink.draw();
      }
      if (chefExists && cookExists) {
        let chefCookLink = new Link(chefObj, cookObj);
        chefCookLink.draw();
      }
      if (chefExists && fridgeExists) {
        let chefFridgeLink = new Link(chefObj, fridgeObj);
        chefFridgeLink.draw();
      }
      if (fridgeExists && pastryExists) {
        let fridgePastryLink = new Link(fridgeObj, pastryChefObj);
        fridgePastryLink.draw();
      }
    }

    let canvas = document.querySelector("#mycanvas");
    let ctx = canvas.getContext("2d");

    drawArchitecture(this.state.front, this.state.bar, this.state.chef, this.state.cook, this.state.fridge, this.state.pastryChef);

    interval = setInterval(() => {
      fetch("/system").then(resp => resp.json()).then(snap => {
        this.setState(snap);
        drawArchitecture(this.state.front, this.state.bar, this.state.chef, this.state.cook, this.state.fridge, this.state.pastryChef);
      });
    }, 1000);
    // socket.onmessage = (msg) => {
    //   let data = JSON.parse(msg.data);
    //   console.log(data);
    //   this.setState(data);
    //   drawArchitecture(this.state.front, this.state.bar, this.state.chef, this.state.cook, this.state.fridge, this.state.pastryChef);
    // };
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  render() {
    return (
      <Slide notes={this.props.notes}>
        <Subtitle>Architecture</Subtitle>
        <canvas id="mycanvas" width="1200px" height="800px" />
      </Slide>
    )
  }
}