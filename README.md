<h1 align="center">React Solitaire</h1>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/spaulas/solitaireGame?logo=typescript&style=for-the-badge">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/spaulas/solitaireGame?style=for-the-badge">
  <img alt="Netlify" src="https://img.shields.io/netlify/d1ce08ff-353e-439d-a678-1159bbf60303?logo=netlify&style=for-the-badge">
  <img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed-raw/spaulas/solitaireGame?style=for-the-badge">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/spaulas/solitaireGame?style=for-the-badge">
</p>
<img align="left" alt="react-solitaire-1995" width="100%" src="https://i.ibb.co/dgTkcP7/topBadge.png" />
&nbsp;

<h3 align="center"><a href="https://react-solitaire-1995.netlify.app/">Play</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://youtu.be/NRUfqM_jY-k)">Demo</a></h3>
<h3 align="left">Description</h3>

<p>Solitaire game implemented by scratch on react.</p>
<p>In this project, it is possible to not only play solitaire (with drag and drop or by double clicking), but also visualize the previous scores and statistics of either an online player (subscribed by Firebase) or a local player. The main differences between these two types of players are the possibility for the online player to save their data through different devices or sessions and access to the top 10 highscores of every registered user. It also has support for english, portuguese, spanish and german.</p>

<h3 align="left">Set up</h3>

```
npm install
npm start
```

<h3 align="left">Tech Stack</h3>
<img align="left" alt="HTML5" height="30px" src="https://images.vexels.com/media/users/3/166383/isolated/preview/6024bc5746d7436c727825dc4fc23c22-html-programming-language-icon-by-vexels.png" />
<img align="left" alt="CSS3" height="30px" src="https://3.bp.blogspot.com/-oRSUw_TmO9o/XIb61m88fcI/AAAAAAAAIq0/vnxl2zzsXEQsnHI2fH4GjKu_ZT0urRo4wCK4BGAYYCw/s1600/icon%2Bcss%2B3.png" />
<img align="left" alt="Javascript" height="30px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGnwhltDp6v141Wc08D17U-3zGku-gjJEgNg&usqp=CAU" />
<img align="left" alt="Typescript" height="30px" src="https://img2.pngio.com/microsoft-delivers-typescript-30-angular-support-coming-soon-typescript-png-816_816.png" />
<img align="left" alt="React" height="30px" src="https://scand.com/wp-content/uploads/2019/10/React.js_logo-512.png" />
<img align="left" alt="Redux-Saga" height="32px" src="https://user-images.githubusercontent.com/4254571/67069175-f38f7200-f19b-11e9-8a90-cf7dd763f86d.png" />
<img align="left" alt="Antd" height="30px" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
<img align="left" alt="Less" height="23px" src="https://prepros.io/img/home/less.png" />
<img align="left" alt="Firebase" height="30px" src="https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png" /> 
<img align="left" alt="Visual Studio Code" height="30px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png" />
<img align="left" alt="Git" height="25px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1280px-Git-logo.svg.png" />
<br/>
<h3 align="left">Firebase</h3>
<p>Since this is a frontend project, there was no need to complicate and create a database, therefore it is used a backend-as-a-service, the Firebase.</p>
<p>The base structure of a user is the following:</p>


```
{
  createdAt: "04/08/2020, 10:31",
  userName: "solitaireLover",
  email: "solitaireLover@netlify.com",
  hasSavedGame: false,
  savedGame: {},
  maxMoves: 170,
  maxTime: 112,
  nGames: 1,
  settings: {
    joyride: {
      game: false,
      gameOptions: false,
      main: false,
      scores: true,
      statistics: true
    }
  },
  history: [
    {
      date: "04/08/2020, 10:36",
      finalScore: 170,
      moves: 170,
      nHints: 0,
      seconds: 112,
      time: "0:01:
    }
  ],
  graphs: {
    moves: {
      data: [
        { moves: 0, name: "]0, 34]" }, 
        { moves: 0, name: "]34, 68]" }, 
        { moves: 0, name: "]68, 102]" }, 
        { moves: 0, name: "]102, 136]" }, 
        { moves: 1, name: "]136, 170]" }
      ],
      label: {
        "]0, 34]": 0,
        "]34, 68]": 0,
        "]68, 102]": 0,
        "]102, 136]": 0,
        "]136, 170]": 1
      }
    },
    time: {
      data: [
        { seconds: 0, name: "]0, 23]" }, 
        { seconds: 0, name: "]23, 46]" }, 
        { seconds: 0, name: "]46, 69]" }, 
        { seconds: 0, name: "]69, 92]" }, 
        { seconds: 1, name: "]92, 115]" }
      ],
      label: {
        "]0, 23]": 0,
        "]23, 46]": 0,
        "]46, 69]": 0,
        "]69, 92]": 0,
        "]92, 115]": 1
      }
    },
    winsRation: [
      { name: "Wins", value: 1 },
      { name: "Losts", value: 0 }
    ]
  },
}
```

<p>The base structure of the top highscores is the following:</p>

```
highScores: [
  {
    userName: "solitaireLover",
    finalScore: 170
  }
]
```

<p>For an user to sign up or sign in, it was given the options to either use the Google login or an email and password login (the password must follow a base set of rules).</p>

<p>
  <img align="left" alt="SignIn" width="45%" src="https://i.ibb.co/yfrCs0T/signIn.png" />
  <img align="right" alt="SignUp" width="45%" src="https://i.ibb.co/5K5R73H/signUp.png" />
</p>
 
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

<h3 align="left">Game Play</h3>
<p>As it was previously mentioned, this game can be played either by dragging and droping the cards or by double clicking. This moves make sure that:</p>
<ul>
  <li>when a card is dropped in a wrong place, it goes back to the original position;</li>
  <li>more than one card can be dragged at once;</li>
  <li>when a card is double clicked it first tries to go to the goal spot, then to the bottom of a column and then to the first available empty spot;</li>
  <li>when a card is double clicked and there are no options to go, it stays at the original position;</li>
  <li>when a card is removed from a column and there are cards right bellow it that are not flipped, then the first one is flipped automatically.</li>
</ul>


<img align="left" alt="gamePlay" width="100%" src="https://i.ibb.co/X7czXW6/gamePlay.png" />
&nbsp;&nbsp;&nbsp;
<p>Besides the normal solitaire gameplay, more options are available:</p>
<ul>
  <li>undo and redo;</li>
  <li>pause and resume;</li>
  <li>show hints;</li>
  <li>restart;</li>
  <li>start new;</li>
  <li>exit;</li>
  <li>save.</li>
</ul>

<p align="center">
  <img align="center" alt="gameOptions" width="60%" src="https://i.ibb.co/zfZ7Wdm/options.png" />
</p>


<p>When the user finishes a game, a modal is shown with all the game status, this information is stored and can be seen at the scores page as well.</p>

<img align="left" alt="gameOverModal" width="100%" src="https://i.ibb.co/hBDjpdC/gameover.png" />

<br/>
&nbsp;
<h3 align="left">Scores</h3>

<p>The scores page is divided in two parts, the first is the user scores (by default is sorted by final scores) and the top ten highscores. This last part is different for online and local users. Online users see a list of the top ten highscores of all registered users and, since the local user has no access to others, it is listed the top ten highscores currently stored in the device session.</p>

<img align="left" alt="scoresUser" width="100%" src="https://i.ibb.co/6B4wfL7/scores-User.png" />
<br/>
&nbsp;
<img align="left" alt="scoresTop" width="100%" src="https://i.ibb.co/QkN3rXx/scores-Top.png" />
<br/>
&nbsp;
<h3 align="center">Statistics</h3>
<p>In the statistics page, the user can evaluate its win/loss ration, number of moves and time per game through graphs (pie and bar) displayed in a carousel or in a dashboard.</p>
<img align="left" alt="statistics" width="100%" src="https://i.ibb.co/54HHMZh/statistics-Dash.png" />
<br/>
&nbsp;
<h3 align="left">Configurations</h3>
<p>Is in the configuration page that an user can alter his username and language (english, portuguese, german and spanish). It is also possible to deactivate or activate the helps shown throughout the website.</p>

<img align="left" alt="configurations" width="100%" src="https://i.ibb.co/HtwHTPS/configurations.png" />


<br/>
&nbsp;
<h3 align="left">Future Features</h3>

<ul>
  <li>Unit tests with jest;</li>
  <li>End-to-end tests with cypress;</li>
  <li>Button to send all the possible cards to the goal spots;</li>
  <li>Customization (background color and cards backs image);</li>
  <li>"Forgot password" option at sign in.</li>
</ul>
