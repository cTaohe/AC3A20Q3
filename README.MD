# Expense Tracker sequelize

使用 sequelize ，實作記帳本

## 環境
- windows 10
- bcryptjs: ^2.4.3,
- body-parser: ^1.19.0,
- connect-flash: ^0.1.1,
- dotenv: ^8.0.0,
- express: ^4.17.1,
- express-handlebars: ^3.1.0,
- express-session: ^1.16.2,
- express-validator: ^6.1.1,
- method-override: ^3.0.0,
- mysql2: ^1.6.5,
- nodemon: ^1.19.1,
- passport: ^0.4.0,
- passport-facebook: ^3.0.0,
- passport-local: ^1.0.0,
- sequelize: ^5.10.2,
- sequelize-cli: ^5.5.0

## 工具

- MySQL
- MySQL Workbench

## 下載安裝

1. 下載
2. 進入 AC3A20Q3 資料夾
3. 安裝套件

```
git clone https://github.com/cTaohe/AC3A20Q3.git
cd AC3A20Q3/
npm install
```
## 為第三方登入修改設定檔

在 .env 加入[facebook developer](https://developers.facebook.com/)三方登入相關設定

```
FACEBOOK_ID= 應用程式ID
FACEBOOK_SECRET= 應用程式SECRET編號
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```
## MySQL 設定

1. 安裝 MySQL 後，在 MySQL Workbench 先輸入並運行

```
drop database if exists expenseTracker_sequelize;
create database expenseTracker_sequelize;
use expenseTracker_sequelize;
```
2. 在終端機輸入、運行
```
npx sequelize-cli db:margate
```
3. 在 MySQL Workbench 輸入，並選取運行
```
select * from records;
select * from users;
```
4. 新增種子 或 刪除種子
```
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all
```


## 本地運行

在終端機輸入
```
npm run dev
```

到瀏覽器輸入
```
http://localhost:3000/
```

## 功能

- 註冊
- 一般登入
- 第三方登入 facebook
- 新增支出
- 編輯支出
- 刪除支出
- 查看月份
- 查看分類

## Author

## [Tao](https://github.com/cTaohe)