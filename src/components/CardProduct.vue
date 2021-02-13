<template>
  <div class="w-25 cursor-pointer grid items-center rounded-xl bg-gray-200 p-2">
    <div class="relative">
      <img class="rounded-xl px-1" :src="Product.cover" alt="" />
      <div class="absolute bottom-2 right-2">
        <div v-if="like">
          <span class="material-icons md-48 red600"  @click="setLike(Product._id, !like)">favorite</span>
        </div>
        <div v-else>
          <span class="material-icons md-48 white600"  @click="setLike(Product._id, !like)">favorite</span>
        </div>
        
      </div>
    </div>

    <div class="px-2 pt-3 h-10 flex flex-row items-center justify-between">
      <h4 class="text-black font-bold text-md my-2">{{ Product.name }}</h4>
      <p class="text-black font-black">${{ Product.price }}</p>
    </div>
    <div class="px-2 text-left">
      Disponible <strong>{{ Product.quantity }}</strong> items
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    Product: Object,
  },
  data() {
    return {
      like: JSON.parse(window.localStorage.getItem(this.Product._id))
        ? true
        : false,
    };
  },
  methods: {
    setLike(key, state) {
      window.localStorage.setItem(key, state);
      this.like = state;
    },
  },
};
</script>
<style scoped>
.hello {
  width: 200px;
  height: 400px;
  display: grid;
  padding: 20px;
}
.hello img {
  width: 100%;
}
.material-icons.md-48{
  font-size: 45px;
}
.material-icons.white600{color:#fff;}
.material-icons.red600 { color: #f52839; }
</style>
