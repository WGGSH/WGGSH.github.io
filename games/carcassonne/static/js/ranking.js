var app = new Vue({
  'el': '#app',
  data: {
    scores: 'hello',
  },
  mounted: function(){

    let compare = function(a,b){
      var r = 0;
      if( a[2] > b[2] ){ r = -1; }
      else if( a[2] < b[2] ){ r = 1; }

      return r;
    }

    console.log('hoge');
    axios
      .get('/api/ranking')
      .then(response => {
        console.log(response);
        this.scores = response.data.rank;
        this.scores.sort(compare)
      })
  }
});
