電影網路訂位系統
===============

### 成員: B10200001 程冠衡、B10200035 黃炯仁、B10200033 羅方佑

#### 系統功能

此電影院網路訂位系統提供消費者一個透過網路就能在線上訂位之平台，消費者不僅可以透過訂位系統**了解上映電影的詳細資訊**，包含片長、級數、上映日期等等，並能查看各場次剩餘座位以進行線上**預訂座位**之行為。消費者在選定日期、電影場次和座位後，須填寫個人資料，並在確認後由系統回覆訂位成功之訊息，以完成線上訂位程序。在完成訂位之後，消費者可以到**訂位查詢**頁面輸入訂位者的基本資料，不論是否只填寫任一欄位或填寫所有欄位皆可進行訂位記錄之查詢。

#### 使用技術

使用**Angular JS**、**in-memory web API**(模擬一個伺服器儲存資料)

#### 其他補充說明
1. 參考資料：Angular網頁的範例[Tutorial: Tour of Heroes][0]，一直到第七部分的**HTTP**內的新增資料為止。所以從**service**取得的資料皆使用**Promise<>**，而非**Observable<>**。
2. 因為使用**in-memory web API**，所以所有的資料變動都會在重新整理頁面時被還原。

#### 環境建置
1. 下載[node.js][1]。
2. 安裝[angular cli][2]，在cmd(命令提示字元)下指令:***npm install -g @angular/cli***。
3. 建立一個空的angular project，在cmd內找到喜歡的路徑後，下指令:***ng new project-name***。
4. 安裝使用[in-memory web API][3]所需的東西，在專案資料夾下(或不用?)下指令:***npm install angular-in-memory-web-api --save***。
5. 下載本[github][4]，將**src_a**或**src_b**資料夾**重新命名**為**src**後，**取代**上述第三步驟所建立**專案內的src資料夾**。  
(1) **src_a**: 各個元件的title內容(有用於顯示在html上)，比較接近一般網頁。  
(2) **src_b**: 各個元件的title內容(有用於顯示在html上)，為各個component的名字，方便觀察運作中的來源(component)。
6. 在cmd內，於第三步驟建立的專案資料夾路徑下，下指令:***ng serve***。
7. 打開瀏覽器，於網址列輸入http://localhost:4200/

[0]:https://angular.io/tutorial
[1]:https://nodejs.org/en/download/
[2]:https://angular.io/guide/quickstart
[3]:https://stackoverflow.com/questions/37377529/angular2-tutorial-tour-of-heroes-cannot-find-module-angular2-in-memory-web-a
[4]:https://github.com/sandy900113/HW