<template>
  <div class="w-25 cursor-pointer grid items-center rounded-md bg-blue-500 p-5">
    <img class="rounded-md" :src="Product.cover" alt="" />
    <h4 class="font-bold text-lg text-white my-2">{{ Product.name }}</h4>
    <p class="my-2 text-black">{{ Product.category }}</p>
    <strong class="text-white p-2 bg-blue-800 rounded-md tracking-wider">${{ Product.price }}</strong>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    Product: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width: 200px;
  height: 400px;
  display: grid;
  padding: 20px;
}
.hello img{
  width: 100%;
}
</style>
