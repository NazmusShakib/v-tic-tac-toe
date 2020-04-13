<template>
  <div class="about">
    <h1>This is an about page</h1>


<table>
  <tr>
    <td></td>
    <td class="vert"></td>
    <td></td>
  </tr>
  <tr>
    <td class="hori"></td>
    <td class="vert hori"></td>
    <td class="hori"></td>
  </tr>
  <tr>
    <td></td>
    <td class="vert"></td>
    <td></td>
  </tr>
</table>
</div>
</template>

<script>

export default {
  
  mounted(){

const lines = [
        [0, 1, 2],[3, 4, 5],[6, 7, 8],
        [0, 3, 6],[1, 4, 7],[2, 5, 8],
        [0, 4, 8],[2, 4, 6],
      ];
      var aa = Array(9).fill(null);

      console.log(aa.length);

      /* var channel = this.$pusher.subscribe('reviews');
      channel.bind('review_added', (log) => {
          console.log(log);
      }); */

        /* var context = { title: 'Pusher' };
        var handler = function()
        {
          console.log('My name is ' + this.title);
        };
          channel.bind('dashboard', handler, context);
        */  
        }

}
</script>

<style scoped>
td {
  width: 100px;
  height: 100px;
}
table {
  margin: 5px auto;
}
.vert {
  border-left: 2px solid black;
  border-right: 2px solid black;
}
.hori {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}


/* table {
    margin: 5px auto;
  }
  td {
    width: 100px;
    height: 100px;
  }
  tr:nth-child(1) > td:nth-child(2), tr:nth-child(3) > td:nth-child(2) {
    border-left: 2px solid black;
    border-right: 2px solid black;
  }
  tr:nth-child(2) > td:nth-child(2) {
    border-left: 2px solid black;
    border-right: 2px solid black;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }
  tr:nth-child(2) > td:nth-child(1), tr:nth-child(2) > td:nth-child(3)  {
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  } */



</style>