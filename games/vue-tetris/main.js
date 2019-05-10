const STAGE_WIDTH=10;
const STAGE_HEIGHT=20;
const BLOCK_SIZE=4;
const NEXT_NUM=3;


var app = new Vue({
  el: '#tetris',
  data: {
    // マスの色
    // ブロックのテンプレ
    BLOCK_SET: [
      [[0,2],[1,2],[2,2],[3,2]],
      [[1,1],[1,2],[2,1],[2,2]],
      [[2,1],[1,2],[2,2],[3,2]],
      [[1,1],[2,1],[2,2],[3,2]],
      [[1,1],[2,1],[0,2],[1,2]],
      [[1,1],[1,2],[2,2],[3,2]],
      [[2,1],[0,2],[1,2],[2,2]],
    ],
    // ブロックの色
    BLOCK_COLOR : [
      'black', // 空マス
      'red',
      'blue',
      'green',
      'yellow',
      'pink',
      'cyan',
      'purple',
      'gray',
    ],

    // フィールド用定数
    // STAGE_WIDTH: 10,
    // FIELD_WIDTH: 14,
    // STAGE_HEIGHT: 20,
    // FIELD_HEIGHT: 24,
    field: [], // フィールドの状態保持
    block: [], // 操作中のブロック
    nextBlock: [], //ネクスト

    position: {
      x: 0,
      y: 0,
    }, // 操作中ブロックの位置 (x,y)

    score:0,


  },
  computed:{
    FIELD_WIDTH: function(){
      return STAGE_WIDTH+4;
    },
    FIELD_HEIGHT: function(){
      return STAGE_HEIGHT+4;
    },
    drawField: function(){
      let mergedField = new Array(this.FIELD_WIDTH);
      for(let x=0;x<this.FIELD_WIDTH;x++){
        mergedField[x]=new Array(this.FIELD_HEIGHT);
        for(let y=0;y<this.FIELD_HEIGHT;y++){
          mergedField[x][y]=this.field[x][y];
        }
      }
      for(let y=0;y<BLOCK_SIZE;y++){
        for(let x=0;x<BLOCK_SIZE;x++){
          if(this.block[x][y]!==0){
            mergedField[x+this.position.x][y+this.position.y]=this.block[x][y];
          }
        }
      }

      return mergedField;
    }
  },
  methods: {
    // ゲームの初期化処理
    initialize: function(){
      // フィールド初期化
      this.field=Array(this.FIELD_WIDTH);
      for(let x=0;x<this.FIELD_WIDTH;x++){
        this.field[x]=Array(this.FIELD_HEIGHT);
        for(let y=0;y<this.FIELD_HEIGHT;y++){
          this.field[x][y]=0;
        }
      }
      for(let y=0;y<this.FIELD_HEIGHT;y++){
        for(let x=0;x<2;x++){
          this.field[x][y]=8;
          this.field[this.FIELD_WIDTH-1-x][y]=8;
        }
      }
      for(let x=0;x<this.FIELD_WIDTH;x++){
        for(let y=this.FIELD_HEIGHT-2;y<this.FIELD_HEIGHT;y++){
          this.field[x][y]=8;
        }
      }

      // ブロック初期化
      this.block=[];
      for(let y=0;y<BLOCK_SIZE;y++){
        this.block.push(Array());
        for(let x=0;x<BLOCK_SIZE;x++){
          this.block[y].push(0);
        }
      }

      this.nextBlock=Array(NEXT_NUM);
      for(let i=0;i<NEXT_NUM;i++){
        this.nextBlock[i]=Array(BLOCK_SIZE);
        for(let x=0;x<BLOCK_SIZE;x++){
          this.nextBlock[i][x]=Array(BLOCK_SIZE);
          for(let y=0;y<BLOCK_SIZE;y++){
            this.nextBlock[i][x][y]=0;
          }
        }
      }

      for(let i=0;i<NEXT_NUM+1;i++){
        this.callNextBlock();
      }

      this.score=0;

      setInterval(() => {
        this.move(0,1);
      }, 1000);
    },

    // 新規ブロックの呼び出し
    callNextBlock: function(){
      for(let x=0;x<BLOCK_SIZE;x++){
        for(let y=0;y<BLOCK_SIZE;y++){
          this.block[x][y]=this.nextBlock[0][x][y];
        }
      }

      for(let i=0;i<NEXT_NUM-1;i++){
        for(let x=0;x<BLOCK_SIZE;x++){
          for(let y=0;y<BLOCK_SIZE;y++){
            this.nextBlock[i][x][y]=this.nextBlock[i+1][x][y];
          }
        }
      }
      this.generateBlock();

      // 座標の初期化
      this.position.x=5;
      this.position.y=0;
    },

    // 新しいブロックの作成
    generateBlock: function(){
      let rand = Math.floor(Math.random()*7);
      console.log(rand);
      for(let x=0;x<BLOCK_SIZE;x++){
        for(let y=0;y<BLOCK_SIZE;y++){
          this.nextBlock[NEXT_NUM-1][x][y] = 0;
        }
      }
      for(let i=0;i<4;i++){
        this.nextBlock[NEXT_NUM-1][this.BLOCK_SET[rand][i][0]][this.BLOCK_SET[rand][i][1]]=rand+1;
      }
    },

    // ブロックの固定
    lock: function(){
      this.block.forEach((line,x) => {
        line.forEach((block,y) => {
          if(block!==0){
            this.field[this.position.x+x][this.position.y+y]=block;
          }
        });
      });
      // ライン消去処理
      // 後で
      this.deleteLine();

      this.callNextBlock();
    },

    deleteLine: function(){
      for(let y=0;y<STAGE_HEIGHT+2;y++){
        let flag=true;
        for(let x=2;x<STAGE_WIDTH+2;x++){
          if(this.field[x][y]===0){
            flag=false;
          }
        }
        console.log(flag);
        // そのラインを削除する
        if(flag===true){
          this.score++;
          for(let y2=y;y2>1;y2--){
            for(let x=2;x<STAGE_WIDTH+2;x++){
              this.field[x][y2]=this.field[x][y2-1];
            }
          }
        }
      }
    },

    // 移動
    move: function(x,y){
      let targetPosition ={
        x: this.position.x+x,
        y: this.position.y+y
      };
      if(this.collision(targetPosition,this.block)===false){
        this.position.x+=x;
        this.position.y+=y;
      }else{
        console.log('move failed');
        if(y===1){
          // ブロックの固定処理
          this.lock();
        }
      }
    },

    // 回転
    rotate: function(){
      let targetBlock =[];
      for(let x=0;x<BLOCK_SIZE;x++){
        targetBlock[x]=Array(BLOCK_SIZE);
        for(let y=0;y<BLOCK_SIZE;y++){
          targetBlock[x][y] = this.block[y][BLOCK_SIZE-1-x];
        }
      }

      if(this.collision(this.position,targetBlock)===false){
        this.block=targetBlock.slice();
      }else{
        console.log('rotate failed');
      }
    },

    // 接触判定
    collision: function(targetPosition, targetBlock){
      let result=false;
      targetBlock.forEach((line,x) => {
        line.forEach((block,y) => {
          if(block!==0){
            if(this.field[targetPosition.x+x][targetPosition.y+y]!==0){
              result=true;
            }
          }
        });
      });
      return result;
    }
  },
  created: function(){
    this.initialize();
  }
});
