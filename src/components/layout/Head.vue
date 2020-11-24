<template>
  <section
    class="page-header"
    :style="
      'background-image: linear-gradient(120deg, ' +
      backgroundColorLeft +
      ', ' +
      backgroundColorRight +
      ');color: ' +
      fontColor +
      ';'
    "
  >
    <div style="position: absolute; top: 20px; right: 20px; z-index: 2">
      <el-tooltip
        effect="dark"
        :content="fullButton.full ? '退出' : '全屏'"
        placement="bottom-end"
      >
        <el-button
          @click="full"
          :icon="fullButton.full ? 'el-icon-close' : 'el-icon-rank'"
          circle
        ></el-button>
      </el-tooltip>
    </div>
    <div
      v-for="(item, index) in randomIcon"
      :key="'ri' + index"
      :style="
        'position:absolute; top:' +
        item.top +
        'px; left:' +
        item.left +
        'px; z-index:1;'
      "
    >
      <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
        <b>♪</b>
      </font>
    </div>
    <h1 class="project-name">{{ blogTitle }}</h1>
    <h2 class="project-tagline">{{ blogDescribe }}</h2>
    <a
      :href="'https://github.com/' + githubUsername"
      class="btn"
      target="_blank"
      >GitHub主页</a
    >
    <a
      href="https://github.com/GitHub-Laziji/vblog"
      class="btn"
      target="_blank"
      v-if="!mini"
      >博客源码</a
    >
  </section>
</template>

<script>
// import { mapGetters } from 'vuex'
// import Sidebar from './components/Sidebar'
// import AppMain from './components/AppMain'
// import Foot from './components/Foot'
export default {
  name: "Head",
  // components: {
  //     Sidebar,
  //     AppMain,
  //     Foot
  // },
  data() {
    return {
      music: {
        isPlay: false,
        currentTime: 0,
        maxTime: 0,
        volume: 100,
      },
      fullButton: {
        full: false,
      },
      topbar: {
        active: "",
      },
      randomIcon: [],
    };
  },
  // computed: {
  //     ...mapGetters([
  //         'githubUsername',
  //         'blogTitle',
  //         'blogDescribe',
  //         'avatarUrl',
  //         'name',
  //         'location',
  //         'blog',
  //         'fontColor',
  //         'useBackgroundImage',
  //         'backgroundColorLeft',
  //         'backgroundColorRight',
  //         'audioUrl',
  //         'mini',
  //         'followersTotal',
  //         'followingTotal',
  //         'audioAutoPlay',
  //         'webSites'
  //     ])
  // },
  watch: {
    "$refs.music.currentTime": function () {
      console.log(this.$refs.music.currentTime);
    },
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(this.listenMusic, 1000);
    });
    let width = window.innerWidth;
    for (let i = 0; i < 12; i++) {
      let temp = {};
      let left = this.$util.randomInt(10, width - 310);
      if (left > width / 2 - 150) {
        left += 300;
      }
      temp["left"] = left;
      temp["top"] = this.$util.randomInt(20, 300);
      temp["size"] = this.$util.randomInt(20, 40);
      this.randomIcon.push(temp);
    }
  },
  created() {},
  methods: {
    selectTopbar(index) {
      //取消菜单选中状态
      this.topbar.active = this.topbar.active == "" ? " " : "";
      switch (index) {
        case "#githubHome":
          window.open("https://github.com/" + this.githubUsername);
          break;
        case "#blog":
          if (this.blog) {
            window.open(
              (this.blog.match(/https?:\/\//i) ? "" : "https://") + this.blog
            );
          } else {
            this.$message({
              message: "博主没有其他博客",
              type: "info",
            });
          }
          break;
        default:
          if (/#webSites-\d+/.test(index)) {
            let i = parseInt(index.split("-")[1]);
            let url = this.webSites[i].url;
            window.open((url.match(/https?:\/\//i) ? "" : "https://") + url);
          }
          break;
      }
    },
    moveIcon(index) {
      let width = window.innerWidth;
      this.randomIcon[index]["top"] = this.$util.randomInt(20, 300);
      let left = this.$util.randomInt(10, width - 310);
      if (left > width / 2 - 150) {
        left += 300;
      }
      this.randomIcon[index]["left"] = left;
    },
    full() {
      if (!this.fullButton.full) {
        this.$util.fullScreen();
        this.fullButton.full = true;
      } else {
        this.$util.fullExit();
        this.fullButton.full = false;
      }
    },
    listenMusic() {
      if (!this.$refs.music) {
        return;
      }
      if (this.$refs.music.readyState) {
        this.music.maxTime = this.$refs.music.duration;
      }
      this.music.isPlay = !this.$refs.music.paused;
      this.music.currentTime = this.$refs.music.currentTime;
    },
    play() {
      if (this.$refs.music.paused) {
        this.$refs.music.play();
      } else {
        this.$refs.music.pause();
      }
      this.music.isPlay = !this.$refs.music.paused;
      this.$nextTick(() => {
        document.getElementById("play").blur();
      });
    },
    changeTime(time) {
      this.$refs.music.currentTime = time;
    },
    changeVolume(v) {
      this.music.volume += v;
      if (this.music.volume > 100) {
        this.music.volume = 100;
      }
      if (this.music.volume < 0) {
        this.music.volume = 0;
      }
      this.$refs.music.volume = this.music.volume / 100;
    },
  },
};
</script>

<style>
.page-header {
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
}

.project-name {
  font-size: 3.25rem;
  margin-top: 0;
  margin-bottom: 0.1rem;
}

.project-tagline {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: normal;
  opacity: 0.7;
}

.btn:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

a:hover {
  text-decoration: underline;
}

a:active,
a:hover {
  outline: 0;
}

.btn {
  padding: 0.75rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

a {
  color: #1e6bb8;
  text-decoration: none;
}

.btn + .btn {
  margin-left: 1rem;
}

.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}

.foot {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  word-wrap: break-word;
}
</style>