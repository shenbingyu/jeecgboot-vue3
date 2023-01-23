<template>
  <div>
    {{msg}}
    <a-input v-model:value="msg" @input="onInput"></a-input>
    <br>
    {{count}}
    <a-button @click="onClick">count++</a-button>
    <br>
    a:{{obj.a}}
    <br>
    b:{{obj.b}}
    <br>
    c:{{obj.c}}
  </div>
</template>

<script lang="ts">
//响应式变量
import {ref} from 'vue'

export default {
  name: "TestVue3",
  setup(){
    //变量
    let msg1 = ref<string>('hello world')
    //返回给页面
    return {
      msg1
    }
  },
}
</script>

<!--vue3的setup更方便-->
<script setup lang="ts">
type ObjType = {
  a:number,
  b:number,
  c:string,
  d:boolean
}
//响应式变量
import {ref,reactive} from 'vue'
    //变量
    let msg = ref<string>('hello world')
    //常量
    const count = ref<number>(1)

    const obj= reactive<ObjType>({
      a:1,
      b:2,
      c:'',
      d:true,
    })

    function onClick(){
      //ref需要调用value,reactive不需要
      count.value++
      obj.a++
      obj.b = obj.b + 2
    }

    function onInput(e){
      obj.c = e.target.value
    }

</script>

<style scoped>

</style>
