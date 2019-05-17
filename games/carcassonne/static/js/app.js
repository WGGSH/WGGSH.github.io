const vm = new Vue();
document.oncontextmenu = function() {
    return false;
};

var globalHand = undefined;
var globalField = undefined;
var globalReplayData=new Array(0);
var globalRecordData=new Array(0);
var globalRecordIndex=0;
var globalCellNum=0;

var images = {
  glass: undefined,
  ground: undefined,
  water: undefined,
  water_edge: undefined,
  water_edge_small: undefined,
  water_center: undefined,
  road_edge: undefined,
  road_center: undefined,
  cloud: undefined,
}

Vue.component('cloud',{
  template:`
    <div id='cloud' class='cloud'></div>
  `,
  mounted: function(){
    let vue=this;

    const sketch = function(p5){
      let clickCount=0;
      p5.setup = function(){
        p5.createCanvas(window.innerWidth,window.innerHeight,p5.P2D);
        console.log('hoge');

      }

      p5.draw = function(){
        if(p5.frameCount>=2){
          return;
        }
        // ここに雲を描画する
        console.log('cloud');
        // p5.background(255);
        p5.blendMode(p5.ADD);
        // p5.background(0);
        // p5.translate(p5.frameCount,0);
        p5.image(images.cloud,0,0);
        p5.fill(128,128,96,2);
        p5.noStroke();
        for(let i=0;i<65;i++){
          p5.ellipse(100,100, i*20, i*20);
        }
      }
    }

    new p5(sketch,'cloud');
  }
});

Vue.component('UI-Board',{
  template:`
    <div class= "UI-Board">
      <h2>Time: {{Time}}    Score: {{score}}pt</h2>
    </div>
  `,
  props: {
    isReplay: Boolean,
  },
  data: function(){
    return {
      time: 90,
      score: 0,
      IsReplay: this.isReplay,

    };
  },
  computed: {
    remainingTime: function(){
      return this.isReplay === true ? 0 : this.time;
    },
    Time: function(){
      return ''+Math.floor(this.remainingTime/60) + ':'+(this.remainingTime%60<10 ? '0' : '')+this.remainingTime%60;
    },
  },
  methods: {

    getScore_Length: function(field,x,y,num,val,openFlag){
      // console.log('call: getScore_Length:'+x+','+y+','+num+','+val+','+openFlag);
      // console.log(field[x][y]);
      console.log(x,y);
      let open = openFlag.open;
      // alert('hoge');
      // まず中央のセルを見る
      if(field[x][y].center!==0){
        // 中央と同じ種類の辺を探す
        val =field[x][y].center;
        field[x][y].center=0;

        // 左探索
        if(field[x][y].left===val){
          // console.log('left');
          num++;
          field[x][y].left=0;
          // 1つ左のセルのrightを調べる
          if(x-1>=0 ){
            if(field[x-1][y].use===false){
              // 未使用なら非閉塞ペナルティ
              openFlag.open=true;
            }else{
              // 使用済みなら,点数加算
              num++;
              field[x-1][y].right=0;
              // 中央が同じ種類ならそこから探索を行う
              if(field[x-1][y].center===val){
                num+= this.getScore_Length(field,x-1,y,num,val,openFlag);
              }
            }
          }
        }

        
        // 右探索
        if(field[x][y].right===val){
          // console.log('right');
          num++;
          field[x][y].right=0;
          // 1つ左のセルのrightを調べる
          if(x+1<globalCellNum ){
            if(field[x+1][y].use===false){
              // 未使用なら非閉塞ペナルティ
              openFlag.open=true;
            }else{
              // 使用済みなら,点数加算
              num++;
              field[x+1][y].left=0;
              // 中央が同じ種類ならそこから探索を行う
              if(field[x+1][y].center===val){
                num+= this.getScore_Length(field,x+1,y,num,val,openFlag);
              }
            }
          }
        }

        // 上探索
        if(field[x][y].top===val){
          // console.log('top');
          num++;
          field[x][y].top=0;
          // 1つ上のセルのrightを調べる
          if(y-1>=0 ){
            if(field[x][y-1].use===false){
              // 未使用なら非閉塞ペナルティ
              openFlag.open=true;
            }else{
              // 使用済みなら,点数加算
              num++;
              field[x][y-1].bottom=0;
              // 中央が同じ種類ならそこから探索を行う
              if(field[x][y-1].center===val){
                num+= this.getScore_Length(field,x,y-1,num,val,openFlag);
              }
            }
          }
        }

        // 下探索
        if(field[x][y].bottom===val){
          // console.log('bottom');
          num++;
          field[x][y].bottom=0;
          // 1つ下のセルのrightを調べる
          if(y+1<globalCellNum ){
            if(field[x][y+1].use===false){
              // 未使用なら非閉塞ペナルティ
              open=true;
            }else{
              // 使用済みなら,点数加算
              num++;
              field[x][y+1].top=0;
              // 中央が同じ種類ならそこから探索を行う
              if(field[x][y+1].center===val){
                num+= this.getScore_Length(field,x,y+1,num,val,{open:open});
              }
            }
          }
        }
        
      }
        return num;
    },

    getScore: function(){
      console.log('call: getScore');
      let score=0;
      // フィールドを一旦コピーする
      console.log(globalCellNum);
      bufField = new Array(globalCellNum);
      for(let x=0;x<globalCellNum;x++){
        bufField[x]=new Array(globalCellNum);
        for(let y=0;y<globalCellNum;y++){
          bufField[x][y]={
            use: globalField[x][y].IsUsing,
            top: globalField[x][y].Top,
            bottom: globalField[x][y].Bottom,
            left: globalField[x][y].Left,
            right: globalField[x][y].Right,
            center: globalField[x][y].Center,
          };
        }
      }
      console.log(bufField);
      let num=0;
      let val ={num:0,open:false};
      for(let x=0;x<globalCellNum;x++){
        for(let y=0;y<globalCellNum;y++){
          if(bufField[x][y].use===false)continue;
          let openFlag={open: false};
          // num+=this.getScore_Length(bufField,x,y,0,0,false);
          val=this.getScore_Length(bufField,x,y,0,0,openFlag);
          console.log(val);
          console.log(openFlag);
          num+=(((openFlag.open===false)*9+1)*val);
        }
      }
      // console.log(bufField);
      // bufField.forEach((line,X) => {
      //   line.forEach((cell,Y) => {
      //     console.log(X,Y);
      //     if(cell.use===false)continue;
      //     num+=getScore_Length(bufField,X,Y,0,0,false);
      //   });
      // });

      console.log(num);
      return num;

      globalField.forEach(line => {
        line.forEach(cell => {
          if(cell.IsUsing===true){
            score++;
          }
        });
      });
      return score;
    }
  },
  created: function(){
    let vue =this;
    vm.$on('recalculate',()=>{
      console.log('recieve: recalculate');
      this.score=this.getScore();
      
    });

    console.log(this.isReplay);

    let cutURL = 'replay/';
    let href = window.location.href;
    let index = href.indexOf(cutURL);
    if(index > -1){
      this.IsReplay=true;
      // this.replayID = href.slice(index+1);
      // console.log(this.replayID);
    }
    if(this.IsReplay===true){
      return;
    }

    let timer = setInterval(() => {
      this.time--;
      if(this.time===0){
        // ゲーム終了
        clearInterval(timer);
        // alert('Time up!');

        this.score=this.getScore();
        let name =window.prompt('Time up! \n' + 'Score: ' + this.score + 'pt\n名前を入力してください');
        if(name===null){
          // window.location.href='';
          // this.IsReplay=true;
          return;
        }

        // https://qiita.com/taroc/items/f22f7dd5d6d5443c72a4
        let params = new URLSearchParams();
        params.append('name',name);
        params.append('score',this.score);
        params.append('replay',globalReplayData);
        axios.post('/api/register',params).then(res=>{
          window.location.href ='/ranking';
        });

      }
    }, 1000);
  }

});

Vue.component('Board',{
  template:`
    <div>
      <UI-Board v-bind:isReplay=IsReplay></UI-Board>
      <div v-for="X in x">
        <div v-for="Y in y">
          <p5-cell
            v-bind:canvas='"C"+X+"-"+Y'
            v-bind:x=(X-1)
            v-bind:y=(Y-1)
            v-bind:width=x
            v-bind:height=y
            v-bind:size=cellSize
            v-bind:isReplay=IsReplay
            >
          </p5-cell>
        </div>
      </div>
      
      <p5-cell
        v-bind:canvas='"hand"'
        v-bind:x=0
        v-bind:y=0
        v-bind:width=x
        v-bind:height=y
        v-bind:size=cellSize
        v-bind:isHand=true
        v-bind:isUsing=true
        v-bind:isReplay="IsReplay"
      >
      </p5-cell>
    </div>
  `,
  props: {
    isReplay: Boolean,
    replayID: Number,
  },

  data: function(){
    return{
      IsReplay: this.isReplay,
    }
  },
  computed: {
    fieldHeight: function(){
      return window.innerHeight-100;
    },
    cellNum: function(){
      return 13;
    },
    cellSize: function(){
      if(window.innerWidth>this.fieldHeight){
        return Math.floor(this.fieldHeight/this.cellNum);
      }else{
        return Math.floor(window.innerWidth/this.cellNum);
      }
    },
    x: function(){
      return this.cellNum;
      // return Math.floor(window.innerWidth / this.cellSize);
    },
    y: function(){
      return this.cellNum;
      // return Math.floor(this.fieldHeight / this.cellSize);
    }
  },
  methods: {
    onSetHand(newHand){
      this.hand = newHand;
    }
  },
  mounted: function(){
    globalCellNum=this.cellNum;
    console.log(window.location.href);
    if(window.location.href.indexOf('replay') > -1){
      this.IsReplay=true;
    }
    let cutURL = 'replay/';
    let href = window.location.href;
    let index = href.indexOf(cutURL);
    if(index > -1){
      this.IsReplay=true;
      this.replayID = href.slice(index+cutURL.length);
      console.log(this.replayID);
    }
    
    
    globalField=Array(this.x);
    for(let x=0;x<this.x;x++){
      globalField[x]=Array(this.y);
    }
    console.log(this.cellSize,this.x,this.y);
    console.log(globalField);

    // リプレイデータ取得
    if(this.IsReplay===false){
      return;
    }
    console.log('リプレイ取得');
    console.log(this.replayID);
    axios
      .get('/api/replay/'+this.replayID)
      .then(response => {
        console.log(response);
        globalRecordData = response.data.replay;
        console.log(globalRecordData);
      })

  }
});

Vue.component('p5-cell',{
  template: `
    <div
      v-bind:id='this.canvas'
      class='cell'
      v-bind:style="{
        left:this.x*size,
        top:(this.y+1)*size
      }"
      v-bind:class="{hand: isHand}"
    ></div>
  `,
  // props: ['canvas','width','x','y'],
  // セルの値 0:草原 1:道 2: 水 3:教会
  props: {
    canvas: String,
    width: Number,
    height: Number,
    x: Number,
    y: Number,
    size: Number,
    isUsing: Boolean,
    isHand: Boolean,
    top: Number,
    bottom: Number,
    left:Number,
    right:Number,
    center: Number,
    p5canvas: undefined,
    handCanvas: undefined,
    isReplay: Boolean,
  },
  data: function(){
    return {
      IsUsing: this.isUsing,
      IsHand: this.isHand,
      Top: this.top,
      Bottom: this.bottom,
      Left: this.left,
      Right: this.right,
      Center: this.center,
      P5canvas: this.p5canvas,
      HandCanvas: this.handCanvas,
      IsReplay: this.isReplay,
    }
  },
  methods: {
    setCell: function(t,b,l,r,c){
      
      this.IsUsing=true;
      this.Top=t;
      this.Bottom=b;
      this.Left=l;
      this.Right=r;
      this.Center=c;
      
    },

    onChangeHand(){
      console.log('call: onChangeHand');
      this.$emit('change-hand',10);
    },

    setHandCanvas: function(){
      console.log('call: setHandCanvas');
      // vm.$emit('set-hand-canvas',this.HandCanvas);
      // globalHand = this.HandCanvas;
    },

  },
  created: function(){
    
  },
  mounted: function(){
    let vue=this;

    vm.$on('set-hand-canvas',function(canvas){
      if(vue.IsHand===true){
        console.log('hand');
        return;
      }
      console.log('recieve: set-hand-canvas');
      // console.log(canvas);
      this.HandCanvas=canvas;
      // console.log(this.HandCanvas);
    });

    const sketch = function(p5){
      let clickCount=0;

      p5.setCell = function(t,b,l,r,c,use=true){
        vue.IsUsing=use;
        vue.Top=t;
        vue.Bottom=b;
        vue.Left=l;
        vue.Right=r;
        vue.Center=c;
        p5.frameCount=0;
        p5.redraw();
      }

      p5.setNewHand = function(){
        let rand = Math.floor(Math.random()*75);
        if(rand>0 && rand<2)p5.setCell(0,1,0,0,1);
        else if(rand<6)p5.setCell(0,0,0,0,0);
        else if(rand<7)p5.setCell(2,2,2,2,2);
        else if(rand<11)p5.setCell(1,1,0,2,1);
        else if(rand<16)p5.setCell(2,0,0,0,0);
        else if(rand<18)p5.setCell(0,0,2,2,2);
        else if(rand<19)p5.setCell(2,2,0,0,2);
        else if(rand<22)p5.setCell(0,0,2,0,2);
        else if(rand<24)p5.setCell(0,2,0,2,0);
        else if(rand<27)p5.setCell(2,1,0,1,1);
        else if(rand<30)p5.setCell(1,0,1,2,1);
        else if(rand<33)p5.setCell(1,1,1,2,1);
        else if(rand<35)p5.setCell(2,0,2,0,2);
        else if(rand<38)p5.setCell(2,0,2,0,2);
        else if(rand<42)p5.setCell(2,1,2,1,2);
        else if(rand<45)p5.setCell(2,1,2,1,2);
        else if(rand<46)p5.setCell(2,0,2,2,2);
        else if(rand<49)p5.setCell(2,0,2,2,2);
        else if(rand<51)p5.setCell(2,1,2,2,2);
        else if(rand<52)p5.setCell(2,1,2,2,2);
        else if(rand<60)p5.setCell(1,1,0,0,1);
        else if(rand<69)p5.setCell(0,1,1,0,1);
        else if(rand<73)p5.setCell(0,1,1,1,1);
        else p5.setCell(1,1,1,1,1);

      }

      // 上のセルを取得
      p5.getTopCell = function(){
        if(vue.y==0){
          return undefined;
        }else{
          // console.log(globalField[vue.x][vue.y-1]);
          return globalField[vue.x][vue.y-1];
        }
      }

      // 下のセルを取得
      p5.getBottomCell = function(){
        if(vue.y==vue.height-1){
          return undefined;
        }else{
          return globalField[vue.x][vue.y+1];
        }
      }

      // 左のセルを取得
      p5.getLeftCell = function(){
        if(vue.x==0){
          return undefined;
        }else{
          return globalField[vue.x-1][vue.y];
        }
      }

      // 右のセルを取得
      p5.getRightCell = function(){
        if(vue.x==vue.width-1){
          return undefined;
        }else{
          return globalField[vue.x+1][vue.y];
        }
      }

      p5.rotateCell =  function(){
        // console.log('call rotate');

        let buf=vue.Left;
        vue.Left=vue.Bottom;
        vue.Bottom=vue.Right;
        vue.Right=vue.Top;
        vue.Top=buf;
        // console.log(this.P5canvas);
        // this.P5canvas.redraw();
        p5.frameCount=0;
        p5.redraw();
      }

      p5.isSettable = function(){
        // console.log(globalHand.Top,globalHand.Bottom,globalHand.Left,globalHand.Right,globalHand.Center);

        let result = true; // 整合性を保っているか判別するフラグ falseなら置けない
        let score =0; // 隣接する空白 or 未使用セルの数 4なら置けない
        let top =p5.getTopCell();
        let bottom =p5.getBottomCell();
        let left = p5.getLeftCell();
        let right = p5.getRightCell();

        if(top!==undefined && top.IsUsing===true && (top.Bottom !==globalHand.Top))result=false;
        if(bottom!==undefined && bottom.IsUsing===true && (bottom.Top !==globalHand.Bottom))result=false;
        if(left!==undefined && left.IsUsing===true && (left.Right !==globalHand.Left))result=false;
        if(right!==undefined && right.IsUsing===true && (right.Left !==globalHand.Right))result=false;

        if(top===undefined || top.IsUsing===false)score++;
        if(bottom===undefined || bottom.IsUsing===false)score++;
        if(left===undefined || left.IsUsing===false)score++;
        if(right===undefined || right.IsUsing===false)score++;
        // console.log(result,score);
        return result === true && score!==4;
      }

      // マウスクリック時の処理
      p5.mouseClicked = function(){
        // リプレイ時は無効化
        if(vue.isReplay===true){
          return;
        }
        if(p5.mouseX>=0 && p5.mouseX < p5.width && p5.mouseY >= 0 && p5.mouseY < p5.height){
          
          // 手札がクリックされた場合，回転する
          // globalHand.P5canvas.rotateCell();
          // console.log(globalHand);
          if(vue.isHand===true){
            globalHand.P5canvas.rotateCell();
            // console.log(vue);
            // console.log(vue.HandCanvas);
          }

          // 使われていないマスがクリックされた場合，そこに手札を置いていいか調べる
          if(vue.IsUsing===false){
            // console.log(globalHand);
            // console.log(p5.mouseButton);
            if(p5.isSettable()){
              // セルの設置
              // console.log('settable');
              p5.setCell(globalHand.Top,globalHand.Bottom,globalHand.Left,globalHand.Right,globalHand.Center,true);


              // リプレイへの書き込み
              globalReplayData.push([
                vue.x,
                vue.y,
                globalHand.Top,
                globalHand.Bottom,
                globalHand.Left,
                globalHand.Right,
                globalHand.Center
              ]);

              // 新しいセルを作成する
              globalHand.P5canvas.setNewHand();

              // 得点の計算
              vm.$emit('recalculate');

            }

          }
        }
      }

      // p5.keyPressed = function(){
      //   console.log('keypressed',p5.KeyCode);
      //   if(vue.IsHand===false){
      //     return;
      //   }
      //   switch(p5.KeyCode){
      //     case 'z':
      //       for(let i=0;i<3;i++){
      //         globalHand.P5canvas.rotateCell();
      //       }
      //     break;
      //     case 'x':
      //       globalHand.P5canvas.rotateCell();
      //     break;
      //   }
      // }

      // p5.doubleClicked = function(){
      //   if(p5.mouseX>=0 && p5.mouseX < p5.width && p5.mouseY >= 0 && p5.mouseY < p5.height){
      //     vue.rotateCell();
      //   }
      // }

      p5.keyPressed = function(){
        // if(vue.IsHand===false){
        //   return;
        // }
        globalHand.P5canvas.rotateCell();
      }

      p5.resourceload = function(){
        if(images.glass===undefined){
          images.glass=p5.loadImage('/static/img/glass.png');
        }
        if(images.ground===undefined){
          images.ground=p5.loadImage('/static/img/ground.png');
        }
        if(images.water===undefined){
          images.water=p5.loadImage('/static/img/water.png');
        }
        if(images.water_edge===undefined){
          images.water_edge=p5.loadImage('/static/img/water_edge.png');
        }
        if(images.water_edge_small===undefined){
          images.water_edge_small=p5.loadImage('/static/img/water_edge_small.png');
        }
        if(images.water_center===undefined){
          images.water_center=p5.loadImage('/static/img/water_center.png');
        }
        if(images.road_edge===undefined){
          images.road_edge=p5.loadImage('/static/img/road_edge.png');
        }
        if(images.road_center===undefined){
          images.road_center=p5.loadImage('/static/img/road_center.png');
        }
        if(images.cloud===undefined){
          images.cloud=p5.loadImage('/static/img/cloud.png');
        }
      }

      p5.setup = function(){
        // console.log(vue.isReplay);
        p5.createCanvas(vue.size,vue.size,p5.P2D);
        vue.P5canvas=p5;
        p5.background(Math.floor(Math.random()*40));
        p5.angleMode(p5.DEGREES);

        // 素材読み込み
        p5.resourceload();
        

        // 中央のパネルなら初期設定をする
        if(vue.x===Math.floor(vue.width/2) && vue.y===Math.floor(vue.height/2)){
          p5.setCell(1,1,0,2,1,true);
        }else{
          p5.setCell(0,0,0,0,0,false);
        }

        // 手札ならランダムで模様を決める
        // リプレイ時は未使用マスにする
        if(vue.IsHand===true){
          console.log(vue.isReplay);
          if(vue.isReplay===true){
            p5.setCell(0,0,0,0,0,false);
          }else{
            p5.setNewHand();
          }
        }else{
          // 手札以外ならグローバルフィールドへの登録
          globalField[vue.x][vue.y]=vue;
        }

        // p5.noLoop();
        return;

      }

      p5.drawEdge = function(value){
        switch(value){
          case 0:
          break;
          case 1:
            p5.fill(255);
            // p5.rect(p5.width/20*9,0,p5.width/10,p5.height/5*2);
            // p5.rect(-p5.width/20,-p5.height/2,p5.width/10,p5.height/5*2);
            p5.image(images.road_edge,-p5.width/2,-p5.height/2,p5.width,p5.height);
          break;
          case 2:
            p5.fill(0,128,255);
            // p5.ellipse(p5.width/2,0,p5.width/1.2,p5.height/2);
            // p5.ellipse(0,-p5.height/2,p5.width/1.2,p5.height/2);
            p5.image(images.water_edge_small,-p5.width/2,-p5.height/2,p5.width,p5.height);
          break;
          case 3:
          break;
        }
      }

      p5.drawCenter = function(value){
        switch(value){
          case 0:
          break;
          case 1:
            p5.fill(255);
            // p5.ellipse(p5.width/2, p5.height/2, p5.width/5, p5.height/5);
            p5.image(images.road_center,0,0,p5.width,p5.height);
          break;
          case 2:
            p5.fill(0,128,255);
            // p5.image(images.water_center,-p5.width/2,-p5.height/2,p5.width,p5.height);
            p5.image(images.water_center,0,0,p5.width,p5.height);
            // p5.ellipse(p5.width/2,p5.height/2,p5.width/1.3,p5.height/1.3);
          break;
          case 3:
          break;
        }
      }

      p5.draw = function(){
        if(p5.frameCount>=20){
          return;
        }
        p5.resourceload();

        // アニメーション
        p5.background(0);

        p5.push();
          p5.translate(p5.width/2, p5.height/2);
        let scale = p5.frameCount/10;
        if(scale>1)scale=1;
        p5.scale(scale);

        if(vue.IsUsing===false){
          // 未設置
          p5.background(79,48,7);
          p5.image(images.ground,-p5.width/2,-p5.width/2,p5.width,p5.height);
          p5.noFill();
          p5.stroke(0);
          p5.strokeWeight(1);
          p5.rect(-p5.width/2,-p5.height/2,p5.width,p5.height);
          return;
        }


        // 手札のセルなら，手札を登録する
        if(vue.IsHand===true){
          vue.HandCanvas=vue.Hand;
          globalHand=vue;
          // vue.setHandCanvas();
        }

        //設置済み
        // p5.background(0,64,0);
        
        p5.image(images.glass,-p5.width/2,-p5.height/2,p5.width,p5.height);
        p5.noStroke();

          p5.drawEdge(vue.Top);
          p5.rotate(90);
          p5.drawEdge(vue.Right);
          p5.rotate(90);
          p5.drawEdge(vue.Bottom);
          p5.rotate(90);
          p5.drawEdge(vue.Left);
        p5.pop();

        p5.drawCenter(vue.Center);


        p5.stroke(0);
        p5.strokeWeight(1);
        p5.noFill();
        p5.rect(0,0,p5.width,p5.height);


      }
    }
    
    new p5(sketch,this.canvas);
  }
});

var app = new Vue({
  el: '#app',
  data: {
    color : 'red'
  },
  methods:{
    replayNext: function(){
      console.log('next');
      if(globalRecordIndex===globalRecordData.length){
        alert('リプレイ終了');
        return;
      }
      let record =globalRecordData[globalRecordIndex++];
      let x = record[2];
      let y = record[3];
      let top = record[4];
      let bottom = record[5];
      let left = record[6];
      let right = record[7];
      let center = record[8];
      globalField[x][y].P5canvas.setCell(top,bottom,left,right,center);

      vm.$emit('recalculate');
    }
  }
  // mounted: function(){
  //   const sketch = function (p5){
  //     p5.setup = function() {
  //       p5.createCanvas(50,50);
  //     }

  //     p5.draw = function() {
  //       p5.background(0);
  //     }
  //   }
  //   new p5(sketch,'canvas');
  // }
})
