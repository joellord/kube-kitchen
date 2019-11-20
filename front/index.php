<html>
<head>
<title>Kube Kitchen</title>
<body>
<h3>Hi! My name is <? echo $_ENV["HOSTNAME"] ?> and I'll be taking care of you today</h3>
<p>What can I help you with?</p>
<div>
 <button id="orderDrink">Order drinks</button>
 <button id="orderMain">Order Main course</button>
 <button id="orderDessert">Order dessert</button>
</div>
<pre id="result"></pre>
</body>

<script type="text/javascript">
const CHEF_URL = `http://${location.host}:32300`;
const BAR_URL = `http://${location.host}:31300`;

const order = (item) => {
  let url = "";
  if (item === "drink") url = BAR_URL + "/drink";
  if (item === "main") url = CHEF_URL + "/main";
  if (item === "dessert") url = CHEF_URL + "/dessert";

  return fetch(url).then(resp => resp.json()).then(data => {
    console.log(data);
    document.querySelector("#result").innerText = JSON.stringify(data).replace(/\{/g, "{\n  ").replace(/\,/g, ",\n  ").replace(/\"\}\,/g, "\"\n  },").replace(/\"\}/g, "\"\n}");
  });
}

document.querySelector("#orderDrink").addEventListener("click", () => order("drink"));
document.querySelector("#orderMain").addEventListener("click", () => order("main"));
document.querySelector("#orderDessert").addEventListener("click", () => order("dessert"));

</script>
</html>