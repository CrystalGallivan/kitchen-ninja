<template v-slot:Calculator>
  <div name='Calculator' class="card calculate d-inline-flex p-6" id="calculator">
    <input v-model.number="amount" type="number" class="rounded unit-input text-center m-1" min="0" step=".5">

    <span>Convert From: {{ calculator }}</span>
    <select v-model="from" class="rounded m-1">
      <option disabled value="">From</option>
      <option>g</option>
      <option>oz</option>
      <option>lb</option>
    </select>

    <span>Convert To: {{ calculator }}</span>
    <select @change="calculate" v-model="to" class="rounded m-1">
      <option disabled value="">To</option>
      <option>g</option>
      <option>oz</option>
      <option>lb</option>
    </select>
    <br>
    <h5>Total: {{this.result.toFixed(2)}}
      <small v-if="this.to == 'lb'">lbs</small>
      <small v-else-if="this.to == 'g'">g</small>
      <small v-else-if="this.to == 'oz'">oz</small>
      <small v-else></small>
    </h5>

  </div>

</template>

<script>
  import convert from "convert-units"

  export default {
    name: "Calculator",
    props: [],
    data() {
      return {
        to: "",
        from: "",
        amount: 0,
        result: 0
      }
    },
    computed: {
      calculator() {
        return this.$store.state.calculator;
      }
    },
    methods: {
      calculate() {
        this.result = convert(this.amount).from(this.from).to(this.to)
      }
    },
    components: {}
  }
</script>

<style scoped>
  #calculator {
    display: flex;
    justify-content: center;
    margin: 0px 5px 0px 20px;
  }

  span {
    color: black;
    margin-right: 25px;
  }

  .card {
    border: 1px solid #000;
    color: #000;
    max-width: 220px;
    /* min-width: 210px; */

  }

  .unit-input {
    border: 1px solid #000;
    background-color: rgb(236, 236, 236);
    width: 96%;
  }

  h5 {
    color: black;
    margin-right: 20px;
  }

  select {
    text-align-last: center;
  }
</style>