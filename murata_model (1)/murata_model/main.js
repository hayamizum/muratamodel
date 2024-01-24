// TODO: - ファイル分割:テーブルクラスでも作るべきか？
// TODO: - エクスポートしたjsonファイルを行列らしく見やすくできないのか？
// TODO: - 大きすぎる縦横サイズ変更要求への対処（重くなって落ちる、表示が崩れる）
// TODO: - 編集すると数px盤面がずれる
// TODO: - 準膠着状態の判定


//*****************************
//行列のデータを定義
// 0は空欄、1は上向き、2は下向き
//******************************

//初期値は5*5で空欄
let cellData = new Array(5);
for (let i = 0; i < 5; i++) {
  cellData[i] = new Array(5).fill(0);
}

//********************
// データのエクスポート
//********************

const exportData = () => {
  //保存するかどうか聞いて、 jsonファイルで保存
  isExport = window.confirm('現在のデータを保存しますか？');
  if(isExport) {
    const json = JSON.stringify(cellData, null, '');
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const linkTag = document.createElement('a');
    linkTag.href = url;
    //フォームが空欄だと値が適当になるので要対処？
    linkTag.download = document.getElementById("filename").value;
    linkTag.click();

    URL.revokeObjectURL(url);
    linkTag.remove();
  }
}

const exportBtn = document.querySelector('#export');
exportBtn.addEventListener('click', exportData, false);

//********************
// データのインポート
//********************

function loadJSON() {
  const fileInput = document.getElementById("jsonFileInput");

  const file = fileInput.files[0];
  if (!file) {
    alert("ファイルを選択してください");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const jsonContent = JSON.parse(event.target.result);
      // JSONデータをバリデーション
      for(let i = 0; i < jsonContent.length; i++) {
        for(let j = 0; j < jsonContent[0].length; j++) {
          if(jsonContent[i][j] != 0 && jsonContent[i][j] != 1 && jsonContent[i][j] != 2) {
            throw "二次元配列のデータがおかしい";
          }
        }
      }

      //以下のコードが縦横サイズ変更と冗長なので、addEventListerの引数を渡す方法を取りたい

      //盤面編集モード初期化
      editModeChange("no-edit");

      //変更サイズを取得して行列と表示を書き換え
      let horizontalValue = jsonContent[0].length;
      let verticalValue = jsonContent.length;

      document.getElementsByClassName("horizontal")[0].innerHTML = horizontalValue;
      document.getElementsByClassName("vertical")[0].innerHTML = verticalValue;
      let rows = table.rows.length;
      let cols = table.rows[0].cells.length;
      // 各セルの要素を削除する
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          table.rows[i].deleteCell(0);
        }
      }

      // 各行の要素を削除する
      for (let i = 0; i < rows; i++) {
        table.deleteRow(0);
      }

      // 入力された行列数のテーブルを作成する
      for (let i = 0; i < verticalValue; i++) {
        let row = table.insertRow(i);
        for (let j = 0; j < horizontalValue; j++) {
          let cell = row.insertCell(j);
        }
      }

      // cellDataを初期化
      cellData = new Array(verticalValue - 0); //-0によりstring型からint型へ
      for (let i = 0; i < cellData.length; i++) {
        cellData[i] = new Array(horizontalValue - 0).fill(0);
      }

      //cellDataに読み込んだjsonをコピー、反映
      for(let i = 0; i < cellData.length; i++) {
        for(let j = 0; j < cellData[0].length; j++) {
          cellData[i][j] = jsonContent[i][j];
          if(jsonContent[i][j] == 1) {
            document.getElementById("mainTable").rows[i].cells[j].innerHTML = '<img src="uemukiHokousha.png" width="100%"  alt="uemuki">';
          } else if(jsonContent[i][j] == 2) {
            document.getElementById("mainTable").rows[i].cells[j].innerHTML = '<img src="shitamukiHokousha.png" width="100%"  alt="shitamuki">';
          }
        }
      }
      
    } catch (error) {
      alert("JSONファイルを読み込めませんでした。有効なJSONファイルを選択してください。");
      console.error(error);
    }
  };

  reader.readAsText(file);
}
//********
//柵判定
//********

let sakuHaneiBtn = document.getElementById('sakuHantei');
function shitaDfs(x, y, isVertical) {
  //x,yから左側への柵が存在すればそのパスを、なければfalseを返す
  //直前に縦に移動していたら次は縦移動しない

  if(x < 0 || x > cellData.length - 1 || cellData[x][y] != 2) return false;
  if(y == 0) return [[x,y]];

  if(!isVertical) {
    let res = shitaDfs(x+1, y, true);
    if(res != false) {
      res.push([x,y]);
      return res;
    }
  }
  let res = shitaDfs(x, y-1, false);
  if(res != false) {
    res.push([x,y]);
    return res;
  }
  if(!isVertical) {
    let res = shitaDfs(x-1, y, true);
    if(res != false) {
      res.push([x,y]);
      return res;
    }
  }
  return false;
}
function ueDfs(x, y, isVertical) {
  if(x < 0 || x > cellData.length - 1 || cellData[x][y] != 1) return false;
  if(y == 0) return [[x,y]];

  if(!isVertical) {
    let res = ueDfs(x-1, y, true);
    if(res != false) {
      res.push([x,y]);
      return res;
    }
  }
  let res = ueDfs(x, y-1, false);
  if(res != false) {
    res.push([x,y]);
    return res;
  }
  if(!isVertical) {
    let res = ueDfs(x+1, y, true);
    if(res != false) {
      res.push([x,y]);
      return res;
    }
  }
  return false;
}

sakuHaneiBtn.addEventListener('click', function() {
  colorReset();
  //サンドイッチされている柵を黄色くライトアップ
  let lowestShitaSaku = new Array();
  for(let i = 0; i < cellData.length; i++) {
    let resShitaDfs = shitaDfs(i, cellData[0].length - 1, true);
    if (resShitaDfs != false) {
      lowestShitaSaku = new Array();
      for(let j = 0;j < resShitaDfs.length; j++) {
        lowestShitaSaku[j] = resShitaDfs[j];
      }
      continue;
    }
    if(lowestShitaSaku.length != 0) {
      let resUeDfs = ueDfs(i, cellData[0].length - 1, true);
      if(resUeDfs != false) {

        for(let j = 0; j < resUeDfs.length; j++) {
          document.getElementById("mainTable").rows[resUeDfs[j][0]].cells[resUeDfs[j][1]].style.backgroundColor = "#ADE0EE";
        }
        for(let j = 0; j < lowestShitaSaku.length; j++) {
          document.getElementById("mainTable").rows[lowestShitaSaku[j][0]].cells[lowestShitaSaku[j][1]].style.backgroundColor = "#F5B2B2";
        }

        lowestShitaSaku = new Array();
      }
    }
  }
});
 
//********
//自己占拠判定
//********

let jikoHaneiBtn = document.getElementById('jikoHantei');
jikoHaneiBtn.addEventListener('click', function() {
  colorReset();
 
  //番兵を周囲に持つ配列を定義
  let cellDataTmp = new Array(cellData.length + 2);
  cellDataTmp[0] = new Array(cellData[0].length + 2).fill(0);
  cellDataTmp[cellData.length + 1] = new Array(cellData[0].length + 2).fill(0);
  for (let i = 0; i < cellData.length; i++) {
    cellDataTmp[i+1] = new Array(cellData[0].length + 2).fill(-1);
  }
  for (let i = 0; i < cellData.length; i++) {
    for(let j = 0; j < cellData[0].length; j++) {
      cellDataTmp[i+1][j+1] = cellData[i][j];
    }
  }

  //動けるやつを削除するのを繰り返す。
  while(true) {
    let isChanged = false;
    for(let i = 0; i < cellDataTmp.length; i++) {
      for(let j = 0; j < cellDataTmp[i].length; j++) {
        if(cellDataTmp[i][j] == 1) {
          if(cellDataTmp[i-1][j-1] == 0 || cellDataTmp[i-1][j] == 0 || cellDataTmp[i-1][j+1] == 0) {
            cellDataTmp[i][j] = 0;
            isChanged = true;
          }
        }
        if(cellDataTmp[i][j] == 2) {
          if(cellDataTmp[i+1][j-1] == 0 || cellDataTmp[i+1][j] == 0 || cellDataTmp[i+1][j+1] == 0) {
            cellDataTmp[i][j] = 0;
            isChanged = true;
          }
        }
      }
    }
    if(!isChanged) break;
  }

  //残ったやつをグレーにする
  for(let i = 1; i < cellDataTmp.length - 1; i++) {
    for(let j = 1; j < cellDataTmp[0].length - 1; j++) {
      if(cellDataTmp[i][j] != 0) {
        document.getElementById("mainTable").rows[i-1].cells[j-1].style.backgroundColor = "gray";
      }
    }
  }

})

//********
//盤面編集
//********

let editMode = "no-edit";
let editCellUp = document.getElementById("editUp");
let editCellDown = document.getElementById("editDown");
let editCellEmpty = document.getElementById("editEmpty");

editCellUp.addEventListener('click', function() {
  editModeChange("up");
})
editCellDown.addEventListener('click', function() {
  editModeChange("down");
})
editCellEmpty.addEventListener('click', function() {
  editModeChange("empty");
})


function editModeChange(mode) {
  //すでに選択された状態でクリックされたときも、編集モードを解除
  if (editMode === mode || mode == "no-edit") {
    editMode = "no-edit";
    paintEditCell();
    let cells = document.querySelectorAll("#mainTable td");
    for (let i = 0; i < cells.length; i++) {
      //メイン盤面をマウスオーバーしても色を変えない
      cells[i].addEventListener("mouseover", function() {
        this.style.backgroundColor = "#fff";
      });
      // メイン盤面をクリックしても何もしないようにする
      cells[i].removeEventListener("click", changeCell);
    }
    return;
  }

  //編集モード
  if (mode == "up") {
    paintEditCell(editCellUp);
  }
  if (mode == "down") {
    paintEditCell(editCellDown);
  }
  if (mode == "empty") {
    paintEditCell(editCellEmpty);
  }
  let cells = document.querySelectorAll("#mainTable td");
  for (let i = 0; i < cells.length; i++) {
    // メイン盤面をマウスオーバーしたら灰色に
    cells[i].addEventListener("mouseover", function() {
      this.style.backgroundColor = "#ccc";
    });
    cells[i].addEventListener("mouseout", function() {
      this.style.backgroundColor = "";
    });

    // メイン盤面をクリックしたら画像装入
    cells[i].addEventListener("click", changeCell);
  }
  editMode = mode;
}

//編集モード選択盤面に黄色い枠をつける
function paintEditCell(selectedCell) {
  let child = document.querySelectorAll('#editTable tr td');
  for (let i = 0; i < 3; i++) {
    child[i].style.border = '3px solid blue';
  }
  if (typeof(selectedCell) != "undefined") {
    selectedCell.style.border = '3px solid yellow';
  }
}

//セルに画像を挿入、または削除
function changeCell() {
  let row = this.parentNode.rowIndex;
  let col = this.cellIndex;

  if (editMode == "up") {
    this.innerHTML = '<img src="uemukiHokousha.png" width="100%"  alt="uemuki">';
    cellData[row][col] = 1;
  }
  if (editMode == "down") {
    this.innerHTML = '<img src="shitamukiHokousha.png" width="100%"  alt="shitamuki">';
    cellData[row][col] = 2;
  }
  if (editMode == "empty") {
    this.innerHTML = '';
    cellData[row][col] = 0;
  }
}

//****************
// 背景色リセット
//****************

let colorResetBtn = document.getElementById('colorReset');
colorResetBtn.addEventListener('click', colorReset);
function colorReset() {
  for(let i = 0; i < cellData.length; i++) {
    for(let j = 0; j < cellData[0].length; j++) {
      document.getElementById("mainTable").rows[i].cells[j].style.backgroundColor = "";
    }
  }
}

 


//****************
// 縦横サイズ変更
//****************

let haneiBtn = document.getElementById('hanei');
let table = document.getElementById("mainTable");

haneiBtn.addEventListener('click', function() {

  //はじめに、一つでも要素のあるマスがあるなら、保存するかどうか聞く
  isEmpty = true;
  for (let row = 0; row < cellData.length; row++) {
    for (let col = 0; col < cellData[row].length; col++) {
      if (cellData[row][col] !== 0) {
        isEmpty = false;
        break;
      }
    }
  }
  if(!isEmpty) {
    isRemove = window.confirm('現在のデータを削除してサイズを変更しますか？');
    if(!isRemove) {
      return;
    }
  }

  //盤面編集モード初期化
  editModeChange("no-edit");

  //変更サイズを取得して行列と表示を書き換え
  let horizontalValue = document.changeSizeForm.horizontal.value;
  let verticalValue = document.changeSizeForm.vertical.value;

  document.getElementsByClassName("horizontal")[0].innerHTML = horizontalValue;
  document.getElementsByClassName("vertical")[0].innerHTML = verticalValue;
  let rows = table.rows.length;
  let cols = table.rows[0].cells.length;
  // 各セルの要素を削除する
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      table.rows[i].deleteCell(0);
    }
  }

  // 各行の要素を削除する
  for (let i = 0; i < rows; i++) {
    table.deleteRow(0);
  }

  // 入力された行列数のテーブルを作成する
  for (let i = 0; i < verticalValue; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < horizontalValue; j++) {
      let cell = row.insertCell(j);
    }
  }

  // cellDataを初期化
  cellData = new Array(verticalValue - 0); //-0によりstring型からint型へ
  for (let i = 0; i < cellData.length; i++) {
    cellData[i] = new Array(horizontalValue - 0).fill(0);
  }

})

