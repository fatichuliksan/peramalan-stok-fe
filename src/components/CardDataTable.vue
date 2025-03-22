<template>
  <div class="vx-col w-12/12">
    <div class="vx-row mb-6">
      <div class="flex flex-start ml-5" style="width:50%">
        
      </div>
      <div class="mr-auto"></div>
      <div class="flex flex-end  " >
        <div class="flex flex-end ">
          <vs-input
            class="mb-4 md:mb-0 mr-4 round"
            v-model="params.search"
            @keyup="handleSearch"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
    <!-- <table class="table table-hover table-bordered ">
      <thead style="background-color: lightgray;">
        <tr>
            <slot name="thead"></slot>
            <template v-for="(dataTh,index) in header">
            <th v-bind:key="index" :width="dataTh.width">

                <a v-if="dataTh.sortable!=false" href="javascript:void(0);" v-on:click="handleSort(dataTh.value, 'active')"><div><b>{{dataTh.text}}</b> <i class="fa fa-fw fa-sort-amount-desc"></i></div></a>
                <b v-else>{{dataTh.text}}</b>
            </th>
            </template>
        </tr>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
    </tbody>
    </table> -->
    <div class="vx-row mb-6">
      <slot name="tbody"></slot>
    </div>
    <div class="vx-row mb-6">
      <div class="flex flex-start ml-5" style="font-size:14px">
      {{this.start}} - {{this.end}} of {{this.total}}
      </div>
      <div class="mx-auto"></div>
      <div class="flex flex-end">
        <vs-pagination
          style="padding-top:5px"
          :total="totalPage"
          v-model="setPage"
          :prev-icon="$vs.rtl ? 'arrow_forward' : 'arrow_back'"
          :next-icon="$vs.rtl ? 'arrow_back' : 'arrow_forward'"
        />
      </div>
    </div>
  </div>
</template>
<script>
import vSelect from "vue-select";
export default {
  components: {
    vSelect
  },
  props: {
      responseData : Object,
      propsParams:Object,
      header:Array,
      stripe:{
        type:Boolean,
        default:true
      }
  },
  watch:{
      "responseData":function(){
          this.prosesResponse()
      }
  },
  mounted() {
      this.data = []
      this.params.length = this.propsParams.length
      this.params.order = this.propsParams.order
      this.params.sort = this.propsParams.sort
      this.prosesResponse()
  },
  data() {
    return {
      params: {
        search: "",
        length: 5,
        page: 1,
        order:'',
        sort:''
      },
      total: 0,
      totalPage: 0,
      limits: [5,10, 25, 50, 100,250,1000, "All"],
      start: 1,
      end: this.length,
      data:[]
    };
  },
  methods: {
    handleSearch(searching) {
      this.search = searching;
      this.page = 1;
      this.getData();
    },
    handleChangePage(page) {
      this.params.page = page;
      this.getData();
    },
    prosesResponse(){
        if(this.responseData.length > 0){
          this.data = ["a","a"]
        }else{
          this.data = []
        }
        this.total = this.responseData.recordsTotal
        this.totalPage = Math.ceil(this.total/this.params.length);
        this.setStartEnd()
        
    },
    handleSort(key, active) {
      this.params.order = active;
      if (key !== null) {
        this.params.sort = key;
        console.log(key+" - "+active)
        this.getData(); 
      }
    },
    handleChangelength(val) {
      console.log(val)
      if(this.params.length==''){
          this.params.length = 5
      }else if(this.params.length=="All"){
          this.params.length = this.total
      }else{
          this.params.length = val
      }
      this.getData();
    },
    getData() {
      this.$emit("reloadDataFromChild",this.params)
    },
    handleSelected(tr){
      this.$emit("selectedDataFromChild",tr)
    },
    setStartEnd() {
      let valStart = this.params.page * this.params.length - this.params.length + 1;
      if (valStart > this.total) {
        valStart = 1;
      }
      if(this.responseData.length == 0){
        valStart = 0;
      }
      let valEnd = this.params.length  * this.params.page - (this.params.length - this.responseData.length);
      if (valEnd > this.total) {
        valEnd = this.total;
      }
      this.start = valStart;
      this.end = valEnd;
    }
  },
  // mounted() {
    // this.getData();
  // },
  computed: {
    setPage: {
      get() {
        return 1;
      },
      set(val) {
        this.handleChangePage(val);
      }
    }
  }
};
</script>
